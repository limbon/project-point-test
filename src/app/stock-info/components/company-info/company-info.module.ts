import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxLoadIndicatorModule } from 'devextreme-angular';
import { CommonPipes } from 'src/app/common/pipes';
import { CompanyInfoComponent } from './company-info.component';

@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [CommonModule, DxLoadIndicatorModule, CommonPipes],
  exports: [CompanyInfoComponent],
})
export class CompanyInfoModule {}
