import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUnixTime } from 'date-fns';
import { environment } from '../../../environments/environment';
import {
  CandleInfoResponse,
  CompanyInfo,
  GetSymbolsResponse,
  StockResolution,
} from '../stock-info.interface';

@Injectable({ providedIn: 'root' })
export class StockInfoService {
  constructor(private readonly httpClient: HttpClient) {}

  getSymbols(query?: string) {
    return this.httpClient.get<GetSymbolsResponse>(
      'https://finnhub.io/api/v1/search',
      {
        params: {
          token: environment.finnhubApiKey,
          q: query || '',
        },
      }
    );
  }

  getCompanyInfo(symbol: string) {
    return this.httpClient.get<CompanyInfo>(
      'https://finnhub.io/api/v1/stock/profile2',
      {
        params: {
          token: environment.finnhubApiKey,
          symbol,
        },
      }
    );
  }

  getCandlesForSymbol(
    symbol: string,
    resolution: StockResolution,
    from: Date,
    to: Date
  ) {
    return this.httpClient.get<CandleInfoResponse>(
      'https://finnhub.io/api/v1/stock/candle',
      {
        params: {
          token: environment.finnhubApiKey,
          symbol,
          resolution,
          from: getUnixTime(from),
          to: getUnixTime(to),
        },
      }
    );
  }
}
