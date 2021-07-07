import { WorkDaysService } from './../../../services/work-days.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-medical-schedule',
  templateUrl: './medical-schedule.component.html',
  styleUrls: ['./medical-schedule.component.scss']
})
export class MedicalScheduleComponent implements OnInit {

  scheduleExample:WorkSchedule[];
  active:boolean = false;
  doctorInfo;
  daysWork;
  daysEnables: WorkDay[]=[];

  constructor(private workDaysSvc:WorkDaysService) {
    let idDoc = localStorage.getItem('uid');
    this.workDaysSvc.getWorkDays(idDoc).subscribe(data => {
      this.doctorInfo = data;
      let work_days = data.map(doctor => {
        return doctor.day;
      });
      this.daysWork = work_days;
    });
    this.scheduleExample = [];
  }

  ngOnInit(): void {
    this.getDays();
    this.getSchedule();
  }

  getDays(){
    this.daysEnables = [
      {name:'LUNES',active:false,schedule:this.getSchedule()},
      {name:'MARTES',active:false,schedule:this.getSchedule()},
      {name:'MIERCOLES',active:false,schedule:this.getSchedule()},
      {name:'JUEVES',active:false,schedule:this.getSchedule()},
      {name:'VIERNES',active:false,schedule:this.getSchedule()},
      {name:'SABADO',active:false,schedule:this.getSchedule()},
    ]
  }

  getSchedule():WorkSchedule[]{
    const schedule = [];
    let exampleDate = new Date('11/11/2020 8:00:00');
    let first = exampleDate.getHours()+':00';
    this.scheduleExample.push({'hour':first,'active':true});
    schedule.push({'hour':first,'active':true});
    while(exampleDate.getHours()<19){
      exampleDate.setMinutes( exampleDate.getMinutes() + 30 );
      let minutes = exampleDate.getMinutes() === 0 ? '00':'30'
      let hour = exampleDate.getHours()+':'+minutes;
      this.scheduleExample.push({hour,'active':false});
      schedule.push({hour,'active':false});
    }
    return schedule;
  }


  selectTime(hour){
    hour.active ? hour.active= false: hour.active = true;
    console.log(this.doctorInfo);
    console.log(this.daysWork);
  }
  selectDay(hour){
    hour.active ? hour.active= false: hour.active = true;
    console.log(this.doctorInfo);
    console.log(this.daysWork);
  }
}

export interface WorkDay{
  name:string,
  active:boolean,
  schedule?:any[]
}

export interface WorkSchedule{
  hour:string,
  active:boolean,
}