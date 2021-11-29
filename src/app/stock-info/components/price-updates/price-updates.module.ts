import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceUpdatesComponent } from './price-updates.component';
import { DxChartModule, DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [PriceUpdatesComponent],
  imports: [CommonModule, DxChartModule],
  exports: [PriceUpdatesComponent],
})
export class PriceUpdatesModule {}
