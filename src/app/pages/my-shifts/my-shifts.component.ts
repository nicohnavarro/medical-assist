import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { getDiaFormat } from 'src/app/utils/helpers';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.scss']
})
export class MyShiftsComponent implements OnInit {
  turnos_hoy:Shift[];
  turnos_proximos:Shift[];
  turnos_pasados:Shift[];
  pasados:boolean=true;
  constructor(private turnoSvc:ShiftService) {
    this.getShiftsHoy();
    this.getShiftsProximos();
    this.getShiftsPasados();
   }

  ngOnInit(): void {
  }

  getShiftsHoy(){
    this.turnoSvc.getShifts().subscribe(data => {
      this.turnos_hoy = data.filter((turno)=>{
        if(turno.fecha.split("-")[1] === getDiaFormat(new Date()))
          return turno;
      });
     })
  }

  getShiftsProximos(){
    this.turnoSvc.getShifts().subscribe(data => {
      this.turnos_proximos= data.filter((turno)=>{
        let fecha =turno.fecha.split("-")[1].split("/")
        let dia = fecha[0];
        let mes = fecha[1];
        let anio = fecha[2];
        let fechaCompara = new Date(`${mes}/${dia}/${anio}`);

        if(fechaCompara.getTime() > new Date().getTime())
          return turno;
      });
     })
  }

  getShiftsPasados(){
    this.turnoSvc.getShifts().subscribe(data => {
      this.turnos_pasados= data.filter((turno)=>{
        let fecha =turno.fecha.split("-")[1].split("/")
        let dia = fecha[0];
        let mes = fecha[1];
        let anio = fecha[2];
        let fechaCompara = new Date(`${mes}/${dia}/${anio}`);

        if(fechaCompara.getDay() != new Date().getDay() && fechaCompara.getTime() < new Date().getTime())
          return turno;
      });
     })
  }

  actualizar_turnos(turno:Shift){
    this.getShiftsHoy();
  }

}
