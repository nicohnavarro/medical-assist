import { Component, OnInit } from '@angular/core';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { getDiaFormat } from 'src/app/utils/helpers';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.scss']
})
export class MyShiftsComponent implements OnInit {
  turnos_hoy:ITurno[];
  turnos_proximos:ITurno[];
  turnos_pasados:ITurno[];
  pasados:boolean=true;
  constructor(private turnoSvc:TurnoService) {
    this.getTurnosHoy();
    this.getTurnosProximos();
    this.getTurnosPasados();
   }

  ngOnInit(): void {
  }

  getTurnosHoy(){
    this.turnoSvc.getTurnos().subscribe(data => {
      this.turnos_hoy = data.filter((turno)=>{
        if(turno.fecha.split("-")[1] === getDiaFormat(new Date()))
          return turno;
      });
     })
  }

  getTurnosProximos(){
    this.turnoSvc.getTurnos().subscribe(data => {
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

  getTurnosPasados(){
    this.turnoSvc.getTurnos().subscribe(data => {
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

  actualizar_turnos(turno:ITurno){
    this.getTurnosHoy();
  }

}
