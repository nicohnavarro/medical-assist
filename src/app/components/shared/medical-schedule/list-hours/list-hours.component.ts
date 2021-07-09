import { WorkSchedule } from './../../../../models/WorkDay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-hours',
  templateUrl: './list-hours.component.html',
  styleUrls: ['./list-hours.component.scss']
})
export class ListHoursComponent implements OnInit {
  @Input() schedule:WorkSchedule[]=[]
  @Input() day:string='';
  @Output() selectedHour: EventEmitter<WorkSchedule> = new EventEmitter<WorkSchedule>();
  constructor() { }

  ngOnInit(): void {
  }

  selectTime(hour:WorkSchedule){
    hour.active ? hour.active= false: hour.active = true;
    this.selectedHour.emit(hour);
  } 
}
