import { UserService } from './../../services/user.service';
import { User } from './../../models/User';
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
  todayShifts:Shift[];
  nextShifts:Shift[];
  previousShifts:Shift[];
  user:User | undefined;
  arePrevious:boolean=true;
  constructor(private shiftSvc:ShiftService, private userSvc:UserService) {
    if (localStorage.getItem('uid')) {
      this.userSvc.getById(localStorage.getItem('uid')).subscribe((data) => {
        this.user = data;
        this.getTodayShifts();
        this.getNextShifts();
        this.getPreviousShifts();
      })
    }

   }

  ngOnInit(): void {
  }

  getTodayShifts(){
    this.shiftSvc.getShifts().subscribe(data => {
      this.todayShifts = data
      .filter((shift)=>{
        return (shift.paciente.id == this.user.id) || (shift.medico.id == this.user.id)
      })
      .filter((shift)=>{
        if(shift.fecha.split("-")[1] === getDiaFormat(new Date()))
          return shift;
      });
     })
  }

  getNextShifts(){
    this.shiftSvc.getShifts().subscribe(data => {
      if(this.user.type === 'admin'){
        this.nextShifts= data
        .filter((turno)=>{
          let fecha =turno.fecha.split("-")[1].split("/")
          let dia = fecha[0];
          let mes = fecha[1];
          let anio = fecha[2];
          let fechaCompara = new Date(`${mes}/${dia}/${anio}`);
  
          if(fechaCompara.getTime() > new Date().getTime())
            return turno;
        });
      }
      else{
        this.nextShifts= data
        .filter((shift)=>{
          return (shift.paciente.id == this.user.id) || (shift.medico.id == this.user.id)
        })
        .filter((turno)=>{
          let fecha =turno.fecha.split("-")[1].split("/")
          let dia = fecha[0];
          let mes = fecha[1];
          let anio = fecha[2];
          let fechaCompara = new Date(`${mes}/${dia}/${anio}`);
  
          if(fechaCompara.getTime() > new Date().getTime())
            return turno;
        });
      }
     })
  }

  getPreviousShifts(){
    this.shiftSvc.getShifts().subscribe(data => {
      if(this.user.type === 'admin'){
        this.previousShifts= data
        .filter((turno)=>{
          let fecha =turno.fecha.split("-")[1].split("/")
          let dia = fecha[0];
          let mes = fecha[1];
          let anio = fecha[2];
          let fechaCompara = new Date(`${mes}/${dia}/${anio}`);
  
          if(fechaCompara.getDay() != new Date().getDay() && fechaCompara.getTime() < new Date().getTime())
            return turno;
        });
      }
      else{
        this.previousShifts= data
        .filter((shift)=>{
          return (shift.paciente.id == this.user.id) || (shift.medico.id == this.user.id)
        })
        .filter((turno)=>{
          let fecha =turno.fecha.split("-")[1].split("/")
          let dia = fecha[0];
          let mes = fecha[1];
          let anio = fecha[2];
          let fechaCompara = new Date(`${mes}/${dia}/${anio}`);
  
          if(fechaCompara.getDay() != new Date().getDay() && fechaCompara.getTime() < new Date().getTime())
            return turno;
        });
      }
     })
  }

  udpateShifts(turno:Shift){
    this.getTodayShifts();
  }

}
