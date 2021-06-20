import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-hour',
  templateUrl: './combo-hour.component.html',
  styleUrls: ['./combo-hour.component.scss']
})
export class ComboHourComponent implements OnInit {
  @Input() choseDay: boolean;
  @Input() hours: string[];
  @Input() showHour: string;
  @Output() selectedHour: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onOptionsSelectedHour(hour:string){
    this.selectedHour.emit(hour);
  }
}
