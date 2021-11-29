import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { concatMap, exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { StockInfoWebsocket } from '../../services/stock-info-websocket.service';
import { StockInfoService } from '../../services/stock-info.service';
import { fromUnixTime } from 'date-fns';
import { StockInfoPriceChangePayload } from '../../stock-info.interface';

@Component({
  selector: 'app-test-price-updates',
  templateUrl: './price-updates.component.html',
  styleUrls: ['./price-updates.component.scss'],
})
export class PriceUpdatesComponent implements OnChanges {
  @Input() symbol: string;

  data: Array<{ p: number; t: Date }> = [];
  loading = false;

  constructor(
    private readonly stockInfoService: StockInfoService,
    private readonly stockInfoWebsocket: StockInfoWebsocket
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.loading = true;
    this.data = [];

    this.stockInfoService
      .getQuoteForSymbol(this.symbol)
      .pipe(
        map((value) => ({ p: value.c, t: fromUnixTime(value.t) })),
        tap((quote) => {
          if (quote.p) {
            this.data = [quote];
          }
          this.loading = false;
        }),
        switchMap((value) => {
          if (changes['symbol'].previousValue) {
            const previousSymbol = changes['symbol'].previousValue;
            return this.stockInfoWebsocket.off(previousSymbol);
          }
          return of(value);
        }),
        switchMap(() =>
          this.stockInfoWebsocket
            .on({ type: 'subscribe', symbol: this.symbol })
            .pipe(
              filter((result) => !!result),
              map((result) =>
                (result as StockInfoPriceChangePayload).data
                  .filter((value) => value.s === this.symbol)
                  .map((value) => {
                    const date = new Date();
                    date.setTime(value.t);
                    return { p: value.p, t: date };
                  })
              )
            )
        )
      )
      .subscribe((values) => {
        this.data = [...this.data, ...values];
      });
  }
}
