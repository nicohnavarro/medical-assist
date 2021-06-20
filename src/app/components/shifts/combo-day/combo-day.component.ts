import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-day',
  templateUrl: './combo-day.component.html',
  styleUrls: ['./combo-day.component.scss']
})
export class ComboDayComponent implements OnInit {
  @Input() choseDoctor: boolean;
  @Input() workDays: string[];
  @Input() showDay: string;
  @Output() selectedDay: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
   }

  ngOnInit(): void {
  }

  onOptionsSelected(day: string) {
    this.selectedDay.emit(day);
  }
}
