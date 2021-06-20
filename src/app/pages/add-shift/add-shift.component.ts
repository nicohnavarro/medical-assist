import { IUser } from 'src/app/models/user';
import { ITurno } from '../../models/turno';
import { TurnoService } from '../../services/turno.service';
import { MedicalSpecialtiesService } from '../../services/medical-specialties.service';
import { WorkDaysService } from '../../services/work-days.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Dias } from 'src/app/utils/dias.enum';
import { Especialidades } from 'src/app/utils/especialidades.enum';
import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { getDateWork, getHorarios, getQuincena } from 'src/app/utils/helpers';
import { MedicalSpecialty } from 'src/app/models/medical_specialty';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

  turno_especialidad: MedicalSpecialty;
  turno_medico: IUser;
  turno_dia: string;
  turno_hora: string;
  lista_medicos: IUser[];
  lista_especialidad: any[];
  lista_filtrada_medicos: IUser[];
  lista_filtrada_dias: string[];
  lista_filtrada_horarios: string[];
  tiene_especialidad: boolean = false;
  tiene_medico: boolean = false;
  tiene_dia: boolean = false;
  turno_paciente: IUser;
  loggeado: boolean = false;
  doctorInfo: any[];

  constructor(private userSvc: UserService, private shiftSvc: TurnoService, private specialtiesSvc: MedicalSpecialtiesService, public dialog: MatDialog, private authSvc: AuthService, private router: Router, private workDaysSvc: WorkDaysService) {


    if (localStorage.getItem('uid')) {
      this.loggeado = true;
      this.lista_medicos = [];
      this.lista_filtrada_medicos = [];
      this.lista_filtrada_dias = [];
      this.lista_filtrada_horarios = [];
      this.userSvc.getByType('Medico').subscribe(data => {
        this.lista_medicos = data as IUser[];
      });
      this.userSvc.getById(localStorage.getItem('uid')).subscribe(paciente => {
        this.turno_paciente = paciente as IUser;
      })
      this.specialtiesSvc.getSpecialties().subscribe(data => {
        this.lista_especialidad = data;
      })
    }
  }

  ngOnInit(): void {
  }

  mandamosEspecialidad(id: string) {
    this.cleanFilter();
    this.specialtiesSvc.getSpecialtyById(id).subscribe(data => {
      this.turno_especialidad = data as MedicalSpecialty;
      this.filtrarMedicosByEspecialidad(data.name);
      this.tiene_especialidad = true;

    })
  }

  mandamosMedico(id: string) {
    this.userSvc.getById(id).subscribe(medico => {
      this.turno_dia = null;
      this.turno_hora = null;
      this.turno_medico = medico as IUser;
      this.filtrarDiasByMedico(medico as IUser);
      this.tiene_medico = true;
    })
  }

  mandamosDia(dia: string) {
    this.turno_dia = dia;
    this.tiene_dia = true;
    this.filtrarHoraByDia(dia);

  }

  mandamosHora(hora: string) {
    this.turno_hora = hora;
    this.openDialog();
    console.log(hora);
  }

  filtrarMedicosByEspecialidad(especialidad) {
    let filtrada = this.lista_medicos.filter(medico => {
      if (medico.especializaciones.includes(especialidad.toString()))
        return medico;
    });
    this.lista_filtrada_medicos = filtrada;
  }

  filtrarDiasByMedico(medico: IUser) {
    this.workDaysSvc.getWorkDays(medico.id).subscribe(data => {
      this.doctorInfo = data;
      let work_days = data.map(doctor => {
        return doctor.day;
      });
      this.lista_filtrada_dias = getDateWork(work_days);
    });
  }

  filtrarHoraByDia(selectedDay: string) {
    let day = selectedDay.split('-')[0];
    let shiftsTaken = [];
    let schedule: string[] = this.doctorInfo.filter(info => info.day === day).map(info => info.schedule)[0];
    this.shiftSvc.getTurnos().subscribe((data) => {
      shiftsTaken = data.filter(shift => shift.fecha === selectedDay && shift.estado <= 1).map(item => item.hora)
      if (shiftsTaken.length > 0) {
        this.lista_filtrada_horarios = schedule.filter(hour => !shiftsTaken.includes(hour));
      }
      else {
        this.lista_filtrada_horarios = schedule
      }
    });
  }

  cleanFilter() {
    this.tiene_especialidad = false;
    this.lista_filtrada_medicos = [];
    this.turno_medico = null;
    this.tiene_medico = false;
    this.lista_filtrada_dias = [];
    this.lista_filtrada_horarios = [];
    this.tiene_dia = false;
    this.turno_dia = null;
    this.turno_hora = null;
  }

  async openDialog() {
    let turno: ITurno = {
      especialidad: this.turno_especialidad,
      medico: this.turno_medico,
      fecha: this.turno_dia,
      hora: this.turno_hora,
      paciente: this.turno_paciente,
      estado: 0,
    };


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = {
      turno
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  irIngreso() {
    this.router.navigate(['login']);
  }

}
