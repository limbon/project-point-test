import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInfoComponent } from './stock-info.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [StockInfoComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [StockInfoComponent],
})
export class StockInfoModule {}
