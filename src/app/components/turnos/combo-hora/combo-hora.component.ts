import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-hora',
  templateUrl: './combo-hora.component.html',
  styleUrls: ['./combo-hora.component.scss']
})
export class ComboHoraComponent implements OnInit {
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
