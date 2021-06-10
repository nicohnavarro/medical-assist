import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  turno:ITurno;
  cargando:boolean;
  turno_cargado:boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {turno},private turnoSvc:TurnoService) {

    this.turno=data.turno;
    this.cargando=false;
    this.turno_cargado = false;
   }

  ngOnInit(): void {
  }

  confirmarTurno(){
    this.cargando= true;
    setTimeout(() => {
      console.log(this.turno);
      this.turnoSvc.agregarTurno(this.turno);
      this.cargando=false;
      this.turno_cargado = true;
    }, 2000);

    
  }
}
