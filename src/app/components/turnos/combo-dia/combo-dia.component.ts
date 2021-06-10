import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {getHorarios, getQuincena} from 'src/app/utils/helpers';

@Component({
  selector: 'app-combo-dia',
  templateUrl: './combo-dia.component.html',
  styleUrls: ['./combo-dia.component.scss']
})
export class ComboDiaComponent implements OnInit {
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
