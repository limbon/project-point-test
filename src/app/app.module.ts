import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StockInfoModule } from './stock-info/stock-info.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StockInfoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
