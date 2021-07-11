import { ShiftService } from './../../../services/shift.service';
import { Component, OnInit } from '@angular/core';

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

@Component({
  selector: 'app-heat-map-calendar',
  templateUrl: './heat-map-calendar.component.html',
  styleUrls: ['./heat-map-calendar.component.scss']
})
export class HeatMapCalendarComponent implements OnInit {

  // view: any[] = [1000, 200];
  view=undefined
  colorScheme = {
    domain:
      ['#c9bcfb',
        '#afa2de',
        '#937be9',
        '#7e5feb',
        '#633de7',
        '#471be3',
        '#4018e0',
        '#3714dc',
        '#2f10d8',
        '#19079c']
  };
  calendarData: dataDate[];
  animations: boolean = true;
  showLegend = true;
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  innerPadding = '10%';
  tooltipDisabled = false;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  rotateXAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;

  constructor(private shiftSvc: ShiftService) {
    this.shiftSvc.getShifts().subscribe((data) => {
      const shifts = data.map(shift => shift.fecha.split('-')[1]);
      const dateValid = shifts.map((date) => {
        const numdate = date.split('/')
        return new Date(`${numdate[1]}/${numdate[0]}/${numdate[2]}`);
      });
      const newFiltered = this.compressArray(dateValid);
      this.calendarData = this.getCalendarData(newFiltered);
    })
  }

  ngOnInit(): void {
  }

  getCalendarData(data: dataDate[]): any[] {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const calendarData = [];
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + week * 7;
      const monday = getDate(mondayDay);

      // one week
      const series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        const date = getDate(mondayDay - 1 + dayOfWeek);

        // skip future dates
        if (date > now || date.getDay() === 0) {
          continue;
        }

        // value
        // const value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;
        const valueFilter = data.filter((value) => value.date.valueOf() === date.valueOf())[0];
        const value = valueFilter ? valueFilter.value : 0;
        console.log(value);

        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      calendarData.push({
        name: monday.toString(),
        series
      });
    }

    return calendarData;
  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
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


  compressArray(original: Date[]): dataDate[] {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice();

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        console.log(copy[w]);
        if (original[i].valueOf() === copy[w]?.valueOf()) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 0) {
        var a = { date: original[i], value: myCount }
        compressed.push(a);
      }
    }

    return compressed;
  };

}

export type dataDate = {
  date: Date,
  value: number
}
