import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInfoComponent } from './stock-info.component';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular';
import { CompanyInfoModule } from './components/company-info/company-info.module';
import { CandlesModule } from './components/candles/candles.module';

@NgModule({
  declarations: [StockInfoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    CompanyInfoModule,
    CandlesModule,
  ],
  exports: [StockInfoComponent],
})
export class StockInfoModule {}
