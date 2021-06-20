import { IUser } from 'src/app/models/user';
import { ITurno } from '../../models/turno';
import { TurnoService } from '../../services/turno.service';
import { MedicalSpecialtiesService } from '../../services/medical-specialties.service';
import { WorkDaysService } from '../../services/work-days.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';
import { getDateWork} from 'src/app/utils/helpers';
import { MedicalSpecialty } from 'src/app/models/medical_specialty';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

  shiftSpecialty: MedicalSpecialty;
  shiftPatient: IUser;
  shiftDoctor: IUser;
  shiftDay: string;
  shiftHour: string;
  
  doctorList: IUser[];
  doctorInfo: any[];
  specialtiesList: any[];

  doctorFilterList: IUser[];
  dayFilterList: string[];
  hourFilterList: string[];
  
  isLogged: boolean = false;
  haveSpecialty: boolean = false;
  haveDoctor: boolean = false;
  haveDay: boolean = false;
  

  constructor(
    private userSvc: UserService, 
    private shiftSvc: TurnoService, 
    private specialtiesSvc: MedicalSpecialtiesService,
    public dialog: MatDialog,
    private router: Router, 
    private workDaysSvc: WorkDaysService
    ){
    if (localStorage.getItem('uid')) {
      this.isLogged = true;
      this.initialState();
    }
  }

  ngOnInit(): void {
  }

  private initialState(){
    this.doctorList = [];

    this.doctorFilterList = [];
    this.dayFilterList = [];
    this.hourFilterList = [];

    this.userSvc.getByType('Medico').subscribe(data => {
      this.doctorList = data as IUser[];
    });

    this.userSvc.getById(localStorage.getItem('uid')).subscribe(paciente => {
      this.shiftPatient = paciente as IUser;
    });

    this.specialtiesSvc.getSpecialties().subscribe(data => {
      this.specialtiesList = data;
    });
  }

  sendSpecialty(id: string) {
    this.cleanFilter();
    this.specialtiesSvc.getSpecialtyById(id).subscribe(data => {
      this.shiftSpecialty = data as MedicalSpecialty;
      this.filterDoctorBySpecialty(data.name);
      this.haveSpecialty = true;
    });
  }

  sendDoctor(id: string) {
    this.userSvc.getById(id).subscribe(doctor => {
      this.shiftDay = null;
      this.shiftHour = null;
      this.shiftDoctor = doctor as IUser;
      this.filterDaysByDoctor(doctor as IUser);
      this.haveDoctor = true;
    })
  }

  sendDay(day: string) {
    this.shiftDay = day;
    this.haveDay = true;
    this.filterHourByDay(day);

  }

  sendHour(hour: string) {
    this.shiftHour = hour;
    this.openDialog();
  }

  filterDoctorBySpecialty(specialty) {
    let doctors = this.doctorList.filter(doctor => {
      if (doctor.especializaciones.includes(specialty.toString()))
        return doctor;
    });
    this.doctorFilterList = doctors;
  }

  filterDaysByDoctor(doctor: IUser) {
    this.workDaysSvc.getWorkDays(doctor.id).subscribe(data => {
      this.doctorInfo = data;
      let work_days = data.map(doctor => {
        return doctor.day;
      });
      this.dayFilterList = getDateWork(work_days);
    });
  }

  filterHourByDay(selectedDay: string) {
    let day = selectedDay.split('-')[0];
    let shiftsTaken = [];
    let schedule: string[] = this.doctorInfo.filter(info => info.day === day).map(info => info.schedule)[0];
    this.shiftSvc.getTurnos().subscribe((data) => {
      shiftsTaken = data.filter(shift => shift.fecha === selectedDay && shift.estado <= 1).map(item => item.hora)
      shiftsTaken.length > 0 ?
        this.hourFilterList = schedule.filter(hour => !shiftsTaken.includes(hour))
        :
        this.hourFilterList = schedule
    });
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
    let shiftCreated: ITurno = {
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
      shiftCreated
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  goLogin() {
    this.router.navigate(['login']);
  }

}
