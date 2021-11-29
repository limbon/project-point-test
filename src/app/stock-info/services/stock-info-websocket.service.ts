import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { filter, Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  StockInfoWebsocketEvent,
  StockInfoWebsocketEventMessage,
  StockInfoWebsocketEventPayload,
} from '../stock-info.interface';

@Injectable({ providedIn: 'root' })
export class StockInfoWebsocket {
  private events$ = new Subject<StockInfoWebsocketEventPayload<any>>();
  private isReady$ = new Subject<boolean>();

  private socket = new WebSocket(
    `wss://ws.finnhub.io?token=${environment.finnhubApiKey}`
  );

  constructor() {
    this.socket.onopen = () => {
      this.socket.onmessage = this.onMessage.bind(this);
      this.isReady$.next(true);
    };
  }

  private onMessage(payload: MessageEvent) {
    const data = JSON.parse(payload.data);
    if (data.type !== 'ping') {
      this.events$.next(data);
    }
  }

  on<E extends StockInfoWebsocketEvent>(
    ...data: StockInfoWebsocketEventMessage<E>[]
  ) {
    return this.isReady$.pipe(
      filter((isReady) => !!isReady),
      tap(() => {
        data.forEach((value) => {
          this.socket.send(JSON.stringify(value));
        });
      }),
      switchMap(() => this.events$.asObservable())
    );
  }

  off(...symbols: string[]) {
    return this.isReady$.pipe(
      filter((isReady) => !!isReady),
      tap(() => {
        symbols.forEach((symbol) => {
          this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        });
      }),
      switchMap(() => this.events$.asObservable())
    );
  }
}
