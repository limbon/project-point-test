import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { StockInfoService } from '../../services/stock-info.service';
import { CandleInfo, StockResolution } from '../../stock-info.interface';
import { zipWith } from 'lodash';
import { format, fromUnixTime, subMonths } from 'date-fns';

@Component({
  selector: 'app-test-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.scss'],
})
export class CandlesComponent implements OnChanges {
  @Input() symbol: string;
  @Input() title: string;

  data: CandleInfo[];
  loading = false;

  toDate: Date | number | string = new Date();
  fromDate: Date | number | string = subMonths(this.toDate as Date, 1);
  resolution: StockResolution = 'D';

  resolutionOptions: Array<{ label: string; value: StockResolution }> = [
    { label: '1 minute', value: '1' },
    { label: '5 minutes', value: '5' },
    { label: '15 minutes', value: '15' },
    { label: '30 minutes', value: '30' },
    { label: 'Hour', value: '60' },
    { label: 'Day', value: 'D' },
    { label: 'Month', value: 'M' },
    { label: 'Week', value: 'W' },
  ];

  constructor(private readonly stockInfoService: StockInfoService) {}

  ngOnChanges(): void {
    this.getData();
  }

  getData() {
    const [symbol] = this.symbol.split('/');
    this.loading = true;
    this.stockInfoService
      .getCandlesForSymbol(
        symbol.replace(/\..*/g, ''),
        this.resolution,
        this.fromDate as Date,
        this.toDate as Date
      )
      .pipe(
        map((response) =>
          zipWith(
            response.c,
            response.h,
            response.l,
            response.o,
            response.t,
            (c, h, l, o, t) => {
              return { c, h, l, o, t: fromUnixTime(t) };
            }
          )
        )
      )
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }

  customizeTooltip(arg: {
    openValue: number;
    closeValue: number;
    highValue: number;
    lowValue: number;
    argument: Date;
  }) {
    return {
      text:
        `Date: ${format(arg.argument, 'dd/MM/yyyy')}<br />` +
        `Open: $${arg.openValue}<br/>` +
        `Close: $${arg.closeValue}<br/>` +
        `High: $${arg.highValue}<br/>` +
        `Low: $${arg.lowValue}<br/>`,
    };
  }
}
