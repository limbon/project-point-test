import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

type StockResolution = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M';

@Injectable({ providedIn: 'root' })
export class StockInfoService {
  constructor(private readonly httpClient: HttpClient) {}

  getSymbols(query?: string) {
    return this.httpClient.get('https://finnhub.io/api/v1/search', {
      params: {
        token: environment.finnhubApiKey,
        q: query || '',
      },
    });
  }

  getCandlesForSymbol(
    symbol: string,
    resolution: StockResolution,
    from: Date,
    to: Date
  ) {
    return this.httpClient.get('https://finnhub.io/api/v1/candle', {
      params: {
        token: environment.finnhubApiKey,
        symbol,
        resolution,
        from: from.getTime(),
        to: to.getTime(),
      },
    });
  }
}
