import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  // view: any[] = [600, 400];
  view = undefined;
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
  @Input() data: any[];
  animations: boolean = true;
  showLegend = false;
  legendTitle = 'Legend';
  legendPosition = 'left';
  explodeSlices = false;
  showLabels = true;
  doughnut = false;
  arcWidth = 0.25;
  gradient = false;
  tooltipDisabled = false;
  screenWidth;
  screenHeight;

  constructor() {
    if (window.innerWidth < 600) {
      this.view = [300, 300];
    }
    if (window.innerWidth > 600) {
      this.view = [400, 400];
    }
    if (window.innerWidth > 1500) {
      this.view = [900, 400];
    }
  }

  ngOnInit(): void {}

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}👨‍⚕️</span>
    `;
  }

  dblclick(event) {
    console.log('Double click', event);
  }

  select(data) {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  activate(data) {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data) {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 600) {
      this.view = [400, 400];
    }
    if (window.innerWidth > 600) {
      this.view = [400, 400];
    }
    if (window.innerWidth > 1500) {
      this.view = [900, 400];
    }
    this.screenWidth = window.innerWidth;

    this.screenHeight = window.innerHeight;
  }
}

export type dataPie = {
  name: string;
  value: number;
};

export function formatLabel(label: any): string {
  if (label instanceof Date) {
    label = label.toLocaleDateString();
  } else {
    label = label.toLocaleString();
  }

  return label;
}

/**
 * Escapes a label.
 *
 * @export
 */
export function escapeLabel(label: any): string {
  return label.toLocaleString().replace(/[&'`"<>]/g, (match) => {
    return {
      '&': '&amp;',
      // tslint:disable-next-line: quotemark
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match];
  });
}
