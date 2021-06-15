import { element } from 'protractor';
import { MedicalSpecialtiesService } from './../../../services/medical-specialties.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { ReseniaModalComponent } from '../../shared/resenia-modal/resenia-modal.component';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})
export class ListadoTurnosComponent implements OnInit {

  Estados = EstadosTurno;
  Specialties = [];
  Doctors = [];
  Patients = [];
  @Input() mostrar_turnos: Array<ITurno> = [];
  @Input() turno_pasado: boolean = false;
  @Output() confirmo_turno: EventEmitter<ITurno> = new EventEmitter<ITurno>();
  cargando: boolean = true;
  displayedColumns: string[] = [
    'especialidad',
    'medico',
    'paciente',
    'fecha',
    'hora',
    'estado',
    'atender',
    'cancelar',
    'encuesta',
    'resena'
  ];

  dataSource = new MatTableDataSource<ITurno>(this.mostrar_turnos);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userSvc: UserService, private turnoSvc: TurnoService, public dialog: MatDialog, private specialtiesSvc: MedicalSpecialtiesService) {
    specialtiesSvc.getSpecialties().subscribe(data => {
      this.Specialties = data.map(item => { return { ...item, completed: true } });
    })
    userSvc.getByType('Medico').subscribe(data=>{
      this.Doctors = data.map(item => { return { ...item, completed: true } });
    })
    userSvc.getByType('Paciente').subscribe(data=>{
      this.Patients = data.map(item => { return { ...item, completed: true } });
    })

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = false;
      this.dataSource.data = this.mostrar_turnos;
      this.dataSource.paginator = this.paginator;
    }, 5000);
  }

  getTurnos() {
    this.dataSource.data = this.mostrar_turnos;
  }

  openDialog(component, options?): void {
    const dialogRef = this.dialog.open(component, options);

    dialogRef.afterClosed().subscribe(result => {
      this.getTurnos();
    });
  }

  aceptarTurno(turno: ITurno) {
    turno.estado = EstadosTurno.ACEPTADO;
    this.turnoSvc.modificarTurno(turno, turno.id).then(() => {
      this.confirmo_turno.emit(turno);
    });

  }
  cancelarTurno(turno: ITurno) {
    turno.estado = EstadosTurno.CANCELADO_MEDICO;
    this.turnoSvc.modificarTurno(turno, turno.id).then(() => {
      this.getTurnos();
    });
  }

  changeStateShift(action:string,shift:ITurno){
    switch (action) {
      case 'ACEPTAR':
        shift.estado = EstadosTurno.ACEPTADO;
        this.turnoSvc.modificarTurno(shift, shift.id).then(() => {
          this.confirmo_turno.emit(shift);
        });
        break;
        case 'CANCELAR':
          shift.estado = EstadosTurno.CANCELADO_MEDICO;
          this.turnoSvc.modificarTurno(shift, shift.id).then(() => {
            this.getTurnos();
          });
          break;
      default:
        break;
    }
  }


  agregarEncuesta(turno: ITurno) {

  }
  agregarResena(turno: ITurno) {
    console.log(turno);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass='add-comment-modal';
    const dialogRef = this.dialog.open(ReseniaModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  getFilterSpecialties(filter:any[]){
    let onlyName = filter.map(t=>t.name);
    let newList = this.mostrar_turnos.filter(t => onlyName.includes(t.especialidad.name));
    this.dataSource.data = newList;
  }

  getFilterDoctors(filter:any[]){
    let doctorIds = filter.map(doctor=> doctor.id)
    let newList = this.mostrar_turnos.filter(t => doctorIds.includes(t.medico.id));
    this.dataSource.data = newList;
  }

  getFilterPatients(filter:any[]){
    let patientIds = filter.map(patient=> patient.id)
    let newList = this.mostrar_turnos.filter(t => patientIds.includes(t.paciente.id));
    this.dataSource.data = newList;
  }

}
