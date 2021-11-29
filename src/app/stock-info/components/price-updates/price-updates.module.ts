import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceUpdatesComponent } from './price-updates.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [PriceUpdatesComponent],
  imports: [CommonModule, DxDataGridModule],
  exports: [PriceUpdatesComponent],
})
export class PriceUpdatesModule {}
