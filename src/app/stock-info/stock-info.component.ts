import { Component, OnInit } from '@angular/core';
import { Row } from 'devextreme/ui/data_grid';
import { StockInfoService } from './services/stock-info.service';
import { StockSymbol } from './stock-info.interface';

@Component({
  selector: 'app-test-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss'],
})
export class StockInfoComponent implements OnInit {
  symbols: StockSymbol[] = [];
  selectedSymbol: StockSymbol;

  constructor(private readonly stockInfoService: StockInfoService) {}

  ngOnInit(): void {
    this.stockInfoService.getSymbols().subscribe(({ result }) => {
      this.symbols = result;
    });
  }

  getCompanyInfo(stockSymbol: StockSymbol) {
    return this.stockInfoService.getCompanyInfo(stockSymbol.symbol);
  }

  onSymbolSelect(item: Row<StockSymbol>) {
    this.selectedSymbol = item.data;
  }
}
