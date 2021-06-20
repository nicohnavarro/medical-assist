import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-hour',
  templateUrl: './combo-hour.component.html',
  styleUrls: ['./combo-hour.component.scss']
})
export class ComboHourComponent implements OnInit {
  @Input() eligio_dia: boolean;
  @Input() horarios: string[];
  @Input() horario_mostrar: string;
  @Output() seleccionaHora: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onOptionsSelectedHour(horario:string){
    this.seleccionaHora.emit(horario);
  }
}
