import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUnixTime } from 'date-fns';
import {
  CandleInfoResponse,
  CompanyInfo,
  GetSymbolsResponse,
  QuoteInfo,
  StockResolution,
} from '../stock-info.interface';

@Injectable({ providedIn: 'root' })
export class StockInfoService {
  constructor(private readonly httpClient: HttpClient) {}

  getSymbols(query?: string) {
    return this.httpClient.get<GetSymbolsResponse>('search', {
      params: { q: query || '' },
    });
  }

  getCompanyInfo(symbol: string) {
    return this.httpClient.get<CompanyInfo>('stock/profile2', {
      params: { symbol },
    });
  }

  getQuoteForSymbol(symbol: string) {
    return this.httpClient.get<QuoteInfo>('quote', {
      params: { symbol },
    });
  }

  getCandlesForSymbol(
    symbol: string,
    resolution: StockResolution,
    from: Date,
    to: Date
  ) {
    return this.httpClient.get<CandleInfoResponse>('stock/candle', {
      params: {
        symbol,
        resolution,
        from: getUnixTime(from),
        to: getUnixTime(to),
      },
    });
  }
}
