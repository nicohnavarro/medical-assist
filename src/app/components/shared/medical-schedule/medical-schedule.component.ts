import { ToastNotyf } from './../../../utils/toastNotyf';
import { User } from './../../../models/User';
import { WorkDaysService } from './../../../services/work-days.service';
import { Component, Input, OnInit } from '@angular/core';
import { WorkDay, WorkSchedule } from 'src/app/models/WorkDay';
@Component({
  selector: 'app-medical-schedule',
  templateUrl: './medical-schedule.component.html',
  styleUrls: ['./medical-schedule.component.scss']
})
export class MedicalScheduleComponent implements OnInit {

  @Input() user: User | undefined;
  scheduleExample: WorkSchedule[];
  active: boolean = false;
  daySchedule: string = '';
  msg: string = '';
  loading: boolean = false;
  daysEnables: WorkDay[] = [];

  constructor(private workDaysSvc: WorkDaysService) {
    let idDoc = localStorage.getItem('uid');
    this.workDaysSvc.getWorkDays(idDoc).subscribe(data => {
      data.length > 0 ? this.daysEnables = data.sort((a, b) => a.index - b.index) : this.getDays()
        ; if (data.length > 0) {
          this.daysEnables = data;
        }
    });
    this.scheduleExample = [];
  }

  ngOnInit(): void {
  }

  getDays() {
    this.daysEnables = [
      { index: 1, name: 'LUNES', active: false, schedule: this.getSchedule(), doctorId: this.user.id },
      { index: 2, name: 'MARTES', active: false, schedule: this.getSchedule(), doctorId: this.user.id },
      { index: 3, name: 'MIERCOLES', active: false, schedule: this.getSchedule(), doctorId: this.user.id },
      { index: 4, name: 'JUEVES', active: false, schedule: this.getSchedule(), doctorId: this.user.id },
      { index: 5, name: 'VIERNES', active: false, schedule: this.getSchedule(), doctorId: this.user.id },
      { index: 6, name: 'SABADO', active: false, schedule: this.getSchedule(), doctorId: this.user.id },
    ]
  }

  getSchedule(): WorkSchedule[] {
    const schedule = [];
    let exampleDate = new Date('11/11/2020 8:00:00');
    let first = exampleDate.getHours() + ':00';
    schedule.push({ 'hour': first, 'active': false });
    while (exampleDate.getHours() < 19) {
      exampleDate.setMinutes(exampleDate.getMinutes() + 30);
      let minutes = exampleDate.getMinutes() === 0 ? '00' : '30'
      let hour = exampleDate.getHours() + ':' + minutes;
      schedule.push({ hour, 'active': false });
    }
    return schedule;
  }

  selectDay(day: WorkDay) {
    this.scheduleExample = day.schedule;
    this.daySchedule = day.name;
  }

  selectTime(hour) {
  }

  saveWorkDays() {
    const notyf = ToastNotyf;
    this.daysEnables.forEach(element => {
      const { docId, ...data } = element;
      element.docId ? this.workDaysSvc.updateWorkDays(data, this.user.id, docId).then((data) => {
      }).catch((err) => {
        notyf.open({
          type: 'error',
          message: err.message
        });
      })
        : this.workDaysSvc.addWorkDays(element, this.user.id).then((data) => {
          this.msg = localStorage.getItem('lang') == 'en' ?
            "Schedule Created" :
            "Calendario Creado";
          // notyf.open({
          //   type: 'info',
          //   message: this.msg
          // });
        });
    });
    this.msg = localStorage.getItem('lang') == 'en' ?
      "Schedule Updated" :
      "Calendario Actualizado";
    notyf.open({
      type: 'info',
      message: this.msg
    });
  }
}
