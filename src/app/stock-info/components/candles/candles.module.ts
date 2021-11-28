import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandlesComponent } from './candles.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDateBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CandlesComponent],
  imports: [
    CommonModule,
    DxChartModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    FormsModule,
  ],
  exports: [CandlesComponent],
})
export class CandlesModule {}
