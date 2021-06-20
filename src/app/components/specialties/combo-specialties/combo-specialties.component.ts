import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialidades } from 'src/app/utils/especialidades.enum';

@Component({
  selector: 'app-combo-specialties',
  templateUrl: './combo-specialties.component.html',
  styleUrls: ['./combo-specialties.component.scss']
})
export class ComboSpecialtiesComponent implements OnInit {

  @Output() seleccionaEspecialidad:EventEmitter<Especialidades> = new EventEmitter<Especialidades>();
  especialidades=Especialidades
  constructor() {
   }

  ngOnInit(): void {
  }

  onOptionsSelected(especialidad:Especialidades){
    console.log(especialidad);
    this.seleccionaEspecialidad.emit(especialidad);
  }
}