import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fromUnixTime } from 'date-fns';
import { map, switchMap, tap } from 'rxjs';
import { StockInfoWebsocket } from '../../services/stock-info-websocket.service';
import { StockInfoService } from '../../services/stock-info.service';

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
    const [symbol] = this.symbol.split('/');

    this.loading = true;
    this.stockInfoService
      .getQuoteForSymbol(symbol)
      .pipe(
        tap(() => {
          this.data = [];
          if (changes['symbol'].previousValue) {
            const [previousSymbol] = changes['symbol'].previousValue.split('/');
            this.stockInfoWebsocket.off(previousSymbol).subscribe();
          }
        }),
        map((value) => ({ p: value.c, t: fromUnixTime(value.t) })),
        tap((quote) => {
          if (quote.p) {
            this.data = [quote];
          }
          this.loading = false;
        }),
        switchMap(() =>
          this.stockInfoWebsocket.on({ type: 'subscribe', symbol }).pipe(
            map((result) =>
              result.data.map((value) => ({
                p: value.p,
                t: fromUnixTime(value.t),
              }))
            )
          )
        )
      )
      .subscribe((values) => {
        this.data = [...values, ...this.data];
      });
  }
}
