import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, of, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  StockInfoWebsocketEvent,
  StockInfoWebsocketEventMessage,
  StockInfoWebsocketEventPayload,
} from '../stock-info.interface';

@Injectable({ providedIn: 'root' })
export class StockInfoWebsocket {
  private events$ = new Subject<StockInfoWebsocketEventPayload<any>>();
  private isOpen$ = new BehaviorSubject<boolean>(false);

  private socket = new WebSocket(
    `wss://ws.finnhub.io?token=${environment.finnhubApiKey}`
  );

  constructor() {
    this.socket.onopen = () => {
      this.socket.onmessage = this.onMessage.bind(this);
      this.isOpen$.next(true);
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
    if (this.isOpen$.getValue()) {
      data.forEach((value) => {
        this.socket.send(JSON.stringify(value));
      });
      return this.events$.asObservable();
    }

    return this.isOpen$.pipe(
      filter((isReady) => isReady),
      tap(() => {
        data.forEach((value) => {
          this.socket.send(JSON.stringify(value));
        });
      }),
      switchMap(() => this.events$.asObservable())
    );
  }

  off(...symbols: string[]) {
    if (this.isOpen$.getValue()) {
      symbols.forEach((symbol) => {
        this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      });

      return this.events$.asObservable();
    }

    return this.isOpen$.pipe(
      filter((isReady) => isReady),
      tap(() => {
        symbols.forEach((symbol) => {
          this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        });
      }),
      switchMap(() => of())
    );
  }
}
