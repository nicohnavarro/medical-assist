import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkDay } from 'src/app/models/WorkDay';

@Component({
  selector: 'app-list-days',
  templateUrl: './list-days.component.html',
  styleUrls: ['./list-days.component.scss']
})
export class ListDaysComponent implements OnInit {
  @Input() days:WorkDay[]=[]
  @Output() selectedDay: EventEmitter<WorkDay> = new EventEmitter<WorkDay>();
  constructor() { }

  ngOnInit(): void {
  }

  selectDay(day:WorkDay){
    day.active ? day.active= false: day.active = true;
    this.selectedDay.emit(day);
  } 

}