import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss'],
})
export class VerticalBarComponent implements OnInit {
  single: any[];
  multi: any[];
  @Input() data: any[];
  view: any[] = [900, 400];
  // view: any[] = undefined;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Specialties 👩‍⚕️';
  showYAxisLabel = true;
  yAxisLabel = 'Shifts 📋';

  colorScheme = {
    domain: [
      '#c9bcfb',
      '#afa2de',
      '#937be9',
      '#7e5feb',
      '#633de7',
      '#471be3',
      '#4018e0',
      '#3714dc',
      '#2f10d8',
      '#19079c',
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  onSelect(event) {
    console.log(event);
  }
}

