import { WorkDaysService } from './../../../services/work-days.service';
import { AuthService } from './../../../services/auth.service';
import { Days } from '../../../utils/days.enum';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-medical-schedule',
  templateUrl: './medical-schedule.component.html',
  styleUrls: ['./medical-schedule.component.scss']
})
export class MedicalScheduleComponent implements OnInit {

  scheduleExample:any[];
  active:boolean = false;
  doctorInfo;
  daysWork;

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
    this.getSchedule();
  }

  getSchedule(){
    let exampleDate = new Date('11/11/2020 8:00:00');
    let first = exampleDate.getHours()+':00';
    this.scheduleExample.push({'hour':first,'active':true});
    while(exampleDate.getHours()<19){
      exampleDate.setMinutes( exampleDate.getMinutes() + 30 );
      let minutes = exampleDate.getMinutes() === 0 ? '00':'30'
      let hour = exampleDate.getHours()+':'+minutes;
      this.scheduleExample.push({hour,'active':false});
    }
  }

  selectTime(hour){
    hour.active ? hour.active= false: hour.active = true;
    console.log(this.doctorInfo);
    console.log(this.daysWork);
  }
}
