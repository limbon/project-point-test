import { Component, Input, OnInit } from '@angular/core';
import { StockInfoService } from '../../services/stock-info.service';
import { CompanyInfo } from '../../stock-info.interface';

@Component({
  selector: 'app-test-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
  @Input() symbol: string;

  company: CompanyInfo;
  loading = false;

  constructor(private readonly stockInfoService: StockInfoService) {}

  ngOnInit(): void {
    this.loading = true;
    this.stockInfoService.getCompanyInfo(this.symbol).subscribe((company) => {
      if (!!Object.keys(company).length) {
        this.company = company;

        if (!company.logo) {
          this.loading = false;
        }
      } else {
        this.loading = false;
      }
    });
  }

  onLogoLoad() {
    this.loading = false;
  }
}
