import { WorkSchedule } from './../../models/WorkDay';
import { User } from 'src/app/models/User';
import { Shift } from '../../models/Shift';
import { ShiftService } from '../../services/shift.service';
import { MedicalSpecialtiesService } from '../../services/medical-specialties.service';
import { WorkDaysService } from '../../services/work-days.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';
import { getDateWork } from 'src/app/utils/helpers';
import { MedicalSpecialty } from 'src/app/models/MedicalSpecialty';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  shiftSpecialty: MedicalSpecialty;
  shiftPatient: User;
  shiftDoctor: User;
  shiftDay: string;
  shiftHour: string;

  doctorList: User[];
  doctorInfo: any[];
  specialtiesList: MedicalSpecialty[];

  doctorFilterList: User[];
  dayFilterList: string[] = [];
  hourFilterList: WorkSchedule[];

  isLogged: boolean = false;
  haveSpecialty: boolean = false;
  haveDoctor: boolean = false;
  haveDay: boolean = false;

  shiftsTaken: Shift[];

  constructor(
    private userSvc: UserService,
    private shiftSvc: ShiftService,
    private specialtiesSvc: MedicalSpecialtiesService,
    public dialog: MatDialog,
    private router: Router,
    private workDaysSvc: WorkDaysService
  ) {
    if (localStorage.getItem('uid')) {
      this.isLogged = true;
      this.initialState();
    }
    this.shiftSvc.getShifts().subscribe((data) => {
      this.shiftsTaken = data
    });
  }

  ngOnInit(): void { }

  private initialState() {
    this.doctorList = [];

    this.doctorFilterList = [];
    this.dayFilterList = [];
    this.hourFilterList = [];

    this.userSvc.getByType('doctor').subscribe((data) => {
      this.doctorList = data as User[];
    });

    this.userSvc.getById(localStorage.getItem('uid')).subscribe((paciente) => {
      this.shiftPatient = paciente as User;
    });

    this.specialtiesSvc.getSpecialties().subscribe((data) => {
      this.specialtiesList = data;
    });
  }

  sendSpecialty(specialty: MedicalSpecialty) {
    this.cleanFilter();
    this.shiftSpecialty = specialty;
    this.filterDoctorBySpecialty(specialty.name);
    this.haveSpecialty = true;
  }

  sendDoctor(id: string) {
    this.userSvc.getById(id).subscribe((doctor) => {
      this.shiftDay = null;
      this.shiftHour = null;
      this.shiftDoctor = doctor as User;
      this.filterDaysByDoctor(doctor as User);
      this.haveDoctor = true;
    });
  }

  sendDay(day: string) {
    let divisor = day.split('-');
    this.shiftDay = divisor[0]+'-'+divisor[1];
    this.shiftHour = divisor[2];
    this.haveDay = true;
    this.openDialog();
    // this.filterHourByDay(day);
  }

  sendHour(hour: string) {
    this.shiftHour = hour;
    this.openDialog();
  }

  filterDoctorBySpecialty(specialty: string) {
    let doctors = this.doctorList.filter((doctor) => {
      if (doctor.especializaciones.includes(specialty.toString()))
        return doctor;
    }).map((aux) => {
      let score = aux.qualification ?
        aux.qualification.reduce((accu, current) => (accu.score + current.score)) / aux.qualification.length
        : 0;
      return { ...aux, 'score': score }
    }).sort((a, b) => (a.score < b.score) ? 1 : -1);
    this.doctorFilterList = doctors;
  }

  filterDaysByDoctor(doctor: User) {
    this.workDaysSvc.getWorkDays(doctor.id).subscribe((data) => {
      this.doctorInfo = data;
      let workDays = data
        .filter((workday) => workday.active)
        .map((doctor) => {
          return doctor.name;
        });
      const days = getDateWork(workDays);
      let daysAndHours = [];
      days.forEach((valor, indice, array) => {
        let dayHours=this.filterHourByDay(valor).map((aux) => {
          return `${valor}-${aux.hour}`
        });
        if(daysAndHours.length === 0){
          daysAndHours = dayHours;
        }
        else{
          daysAndHours = daysAndHours.concat(dayHours);
        }
      })
      this.dayFilterList = daysAndHours;
    });
  }

  filterHourByDay(selectedDay: string) {
    let scheduleActive = [];
    let day = selectedDay.split('-')[0];
    let shiftsActive = [];
    let schedule: WorkSchedule[] = this.doctorInfo
      .filter((info) => info.name === day)
      .map((info) => info.schedule)[0]
      .filter((hour) => hour.active);

    shiftsActive = this.shiftsTaken
      .filter((shift) => shift.fecha === selectedDay && shift.estado <= 1)
      .map((item) => item.hora);

    shiftsActive.length > 0
      ? (scheduleActive = schedule.filter(
        (shift) => !shiftsActive.includes(shift.hour)
      ))
      : (scheduleActive = schedule);

    return scheduleActive;

  }

  private cleanFilter() {
    this.haveSpecialty = false;
    this.doctorFilterList = [];
    this.shiftDoctor = null;
    this.haveDoctor = false;
    this.dayFilterList = [];
    this.hourFilterList = [];
    this.haveDay = false;
    this.shiftDay = null;
    this.shiftHour = null;
  }

  async openDialog() {
    let shiftCreated: Shift = {
      especialidad: this.shiftSpecialty,
      medico: this.shiftDoctor,
      fecha: this.shiftDay,
      hora: this.shiftHour,
      paciente: this.shiftPatient,
      estado: 0,
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = {
      shiftCreated,
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.cleanFilter();
      this.shiftSpecialty = null;
    });
    this.shiftSvc.getShifts().subscribe((data) => {
      this.shiftsTaken = data
    });
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}
