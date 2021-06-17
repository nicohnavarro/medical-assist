import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-survey-field',
  templateUrl: './survey-field.component.html',
  styleUrls: ['./survey-field.component.scss']
})
export class SurveyFieldComponent implements OnInit {
  @Input() title:string;
  @Output() sendValue: EventEmitter<any> =new EventEmitter();
  autoTicks = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  tickInterval = 1;

  constructor() { }

  ngOnInit(): void {
  }

  getValue(e){
    this.sendValue.emit(e);
  }

}
