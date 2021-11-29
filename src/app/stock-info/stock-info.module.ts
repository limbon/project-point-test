import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInfoComponent } from './stock-info.component';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular';
import { CompanyInfoModule } from './components/company-info/company-info.module';
import { CandlesModule } from './components/candles/candles.module';
import { PriceUpdatesModule } from './components/price-updates/price-updates.module';

@NgModule({
  declarations: [StockInfoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    CompanyInfoModule,
    CandlesModule,
    PriceUpdatesModule,
  ],
  exports: [StockInfoComponent],
})
export class StockInfoModule {}
