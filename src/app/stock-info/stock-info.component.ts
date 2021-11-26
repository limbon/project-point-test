import { Component, OnInit } from '@angular/core';
import { StockInfoService } from './services/stock-info.service';

@Component({
  selector: 'app-test-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss'],
})
export class StockInfoComponent implements OnInit {
  constructor(private readonly stockInfoService: StockInfoService) {}

  ngOnInit(): void {}
}
