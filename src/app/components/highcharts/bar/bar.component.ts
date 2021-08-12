import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() data = [];
  @Input() name = "";
  chart:Chart;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: this.name
      },
      xAxis: {
        categories: ['Turnos'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cantidad de turnos',
          align: 'high'
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: this.data,
      // legend: {
      //   layout: 'vertical',
      //   align: 'right',
      //   verticalAlign: 'middle'
      // },
    
      // plotOptions: {
      //   series: {
      //     label: {
      //       connectorAllowed: false
      //     },
      //     pointStart: 2010
      //   }
      // },
      // responsive: {
      //   rules: [{
      //     condition: {
      //       maxWidth: 500
      //     },
      //     chartOptions: {
      //       legend: {
      //         layout: 'horizontal',
      //         align: 'center',
      //         verticalAlign: 'bottom'
      //       }
      //     }
      //   }]
      // }
    });
}

  ngOnInit(): void {

  }
}
