import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {getHorarios, getQuincena} from 'src/app/utils/helpers';

@Component({
  selector: 'app-combo-day',
  templateUrl: './combo-day.component.html',
  styleUrls: ['./combo-day.component.scss']
})
export class ComboDayComponent implements OnInit {
  @Input() eligio_medico: boolean;
  @Input() dias: string[];
  @Input() dia_mostrar: string;
  @Output() seleccionaDia: EventEmitter<string> = new EventEmitter<string>();



  constructor() {
   }

  ngOnInit(): void {
  }

  onOptionsSelected(dia: string) {
    this.seleccionaDia.emit(dia);
  }
}
