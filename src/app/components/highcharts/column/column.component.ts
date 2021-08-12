import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  @Input() data = [];
  @Input() name = "";
  chart:Chart;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.chart = new Chart({
      chart: {
        type: 'column'
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
      series: this.data
    });
}

  ngOnInit(): void {
    
  }
}
