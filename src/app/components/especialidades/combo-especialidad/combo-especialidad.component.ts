import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialidades } from 'src/app/utils/especialidades.enum';

@Component({
  selector: 'app-combo-especialidad',
  templateUrl: './combo-especialidad.component.html',
  styleUrls: ['./combo-especialidad.component.scss']
})
export class ComboEspecialidadComponent implements OnInit {

  @Output() seleccionaEspecialidad:EventEmitter<Especialidades> = new EventEmitter<Especialidades>();
  especialidades=Especialidades
  constructor() {
   }

  ngOnInit(): void {
  }

  onOptionsSelected(especialidad:Especialidades){
    this.seleccionaEspecialidad.emit(especialidad);
  }
}