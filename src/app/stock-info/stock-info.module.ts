import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInfoComponent } from './stock-info.component';

@NgModule({
  declarations: [StockInfoComponent],
  imports: [CommonModule],
  exports: [StockInfoComponent],
})
export class StockInfoModule {}
