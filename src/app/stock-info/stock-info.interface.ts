export interface StockSymbol {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface CompanyInfo {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  finnhubIndustry: string;
}

export interface QuoteInfo {
  // Current price
  c: number;

  // Change
  d: number;

  // Percent change
  dp: number;

  // High price of the day
  h: number;

  // Low price of the day
  l: number;

  // Open price of the day
  o: number;

  // Previous close price
  pc: number;

  // Time
  t: number;
}

export interface CandleInfo {
  // Timestamp for returned candle.
  t: Date;

  // Close price for returned candle.
  c: number;

  // High price for returned candle.
  h: number;

  // Low price for returned candle.
  l: number;

  // Open price for returned candle.
  o: number;
}

export interface CandleInfoResponse {
  // List of close prices for returned candles.
  c: number[];

  // List of high prices for returned candles.
  h: number[];

  // List of low prices for returned candles.
  l: number[];

  // List of open prices for returned candles.
  o: number[];

  // Status of the response. This field can either be ok or no_data.
  s: number[];

  // List of timestamp for returned candles.
  t: number[];

  // List of volume data for returned candles.
  v: number[];
}

export interface GetSymbolsResponse {
  count: number;
  result: StockSymbol[];
}

export type StockResolution = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M';

export enum StockInfoWebsocketEvent {
  PriceChange = 'price-change',
}

export type StockInfoWebsocketEventMessage<E extends StockInfoWebsocketEvent> =
  E extends StockInfoWebsocketEvent.PriceChange
    ? StockInfoPriceChangeMessage
    : never;

export type StockInfoWebsocketEventPayload<E extends StockInfoWebsocketEvent> =
  E extends StockInfoWebsocketEvent.PriceChange
    ? StockInfoPriceChangePayload
    : never;

export interface StockInfoPriceChangeMessage {
  type: 'subscribe';
  symbol: string;
}

export interface StockInfoPriceChangePayload {
  type: string;
  data: Array<{
    // Symbol
    s: string;

    // Last price
    p: number;

    // UNIX milliseconds timestamp.
    t: number;

    // Volume
    v: number;
  }>;
}
