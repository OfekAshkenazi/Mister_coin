import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MarketPrice, Value } from 'src/app/models/graph.model';
Chart.register(...registerables);

@Component({
  selector: 'market-price-chart',
  templateUrl: './market-price-chart.component.html',
  styleUrls: ['./market-price-chart.component.scss']
})
export class MarketPriceChartComponent {

  @Input() prices!: MarketPrice

  async ngOnInit() {
    const pricesValues = this.prices.values.splice(this.prices.values.length - 30)
    var marketPrice = new Chart("market-price", {
      type: 'line',
      data: {
        labels: this.getDates(pricesValues),
        datasets: [{
          borderColor: 'whitesmoke',
          label: 'Market Price last 30 days',
          data: this.getData(pricesValues),
          tension: 0.1,
        }]
      },
    })
  }

  getDates(values: Value[]) {
    return values.map(value => {
      const date = new Date(value.x * 1000)
      return (date.getMonth() + 1) + '-' + (date.getDate() + 1)
    })
  }
  getData(values: Value[]) {
    return values.map(value => value.y)
  }

}
