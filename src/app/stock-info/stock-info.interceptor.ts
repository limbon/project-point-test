import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class StockInfoInterceptor implements HttpInterceptor {
  private baseUrl = 'https://finnhub.io/api/v1';
  private token = environment.finnhubApiKey;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      url: `${this.baseUrl}/${req.url}`,
      params: req.params.append('token', this.token),
    });

    return next.handle(req);
  }
}
