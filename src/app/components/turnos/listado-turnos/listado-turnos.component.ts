import { CancelModalComponent } from './../../shared/cancel-modal/cancel-modal.component';
import { AuthService } from './../../../services/auth.service';
import { element } from 'protractor';
import { MedicalSpecialtiesService } from './../../../services/medical-specialties.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { ReseniaModalComponent } from '../../shared/resenia-modal/resenia-modal.component';
import { ReviewModalComponent } from '../../shared/review-modal/review-modal.component';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss'],
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
  typeUser: string = '';
  displayedColumns: string[] = [
    'especialidad',
    'medico',
    'paciente',
    'fecha',
    'hora',
    'estado',
    'atender',
    'cancelar',
    'finalizar',
    'encuesta',
    'resena',
  ];

  dataSource = new MatTableDataSource<ITurno>(this.mostrar_turnos);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userSvc: UserService,
    private turnoSvc: TurnoService,
    public dialog: MatDialog,
    private specialtiesSvc: MedicalSpecialtiesService,
    private authSvc: AuthService
  ) {
    this.typeUser = authSvc.user.type;
    if (this.typeUser === 'Paciente') {
      let removeId = this.displayedColumns.indexOf('atender');
      let finishId = this.displayedColumns.indexOf('finalizar');
      this.displayedColumns.splice(removeId, 1);
      this.displayedColumns.splice(finishId, 1);
    }
    specialtiesSvc.getSpecialties().subscribe((data) => {
      this.Specialties = data.map((item) => {
        return { ...item, completed: true };
      });
    });
    userSvc.getByType('Medico').subscribe((data) => {
      this.Doctors = data.map((item) => {
        return { ...item, completed: true };
      });
    });
    userSvc.getByType('Paciente').subscribe((data) => {
      this.Patients = data.map((item) => {
        return { ...item, completed: true };
      });
    });
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

    dialogRef.afterClosed().subscribe((result) => {
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

  canCancel(state: number): boolean {
    switch (state) {
      case EstadosTurno.PENDIENTE:
        return true;
        break;

      default:
        return false;
        break;
    }
  }

  changeStateShift(action: string, shift: ITurno, typeUser: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.maxWidth = '60vw';
    dialogConfig.data = {
      shift,
      typeUser,
    };

    switch (action) {
      case 'ACEPTAR':
        shift.estado = EstadosTurno.ACEPTADO;
        this.turnoSvc.modificarTurno(shift, shift.id).then(() => {
          this.confirmo_turno.emit(shift);
          let notyf = new Notyf();
          notyf.success('El turno ha sido Aceptado.');
        });
        break;
      case 'CANCELAR':
        let dialogRef = this.dialog.open(CancelModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          this.getTurnos();
        });
        break;
      case 'FINALIZADO':
        let reviewModal = this.dialog.open(ReviewModalComponent, dialogConfig);
        reviewModal.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          this.getTurnos();
        });
        break;
    }
  }

  agregarEncuesta(turno: ITurno) {}
  seeReview(shift: ITurno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.maxWidth = '30vw';
    dialogConfig.data = {
      shift,
    };
    const dialogRef = this.dialog.open(ReseniaModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getFilterSpecialties(filter: any[]) {
    let onlyName = filter.map((t) => t.name);
    let newList = this.mostrar_turnos.filter((t) =>
      onlyName.includes(t.especialidad.name)
    );
    this.dataSource.data = newList;
  }

  getFilterDoctors(filter: any[]) {
    let doctorIds = filter.map((doctor) => doctor.id);
    let newList = this.mostrar_turnos.filter((t) =>
      doctorIds.includes(t.medico.id)
    );
    this.dataSource.data = newList;
  }

  getFilterPatients(filter: any[]) {
    let patientIds = filter.map((patient) => patient.id);
    let newList = this.mostrar_turnos.filter((t) =>
      patientIds.includes(t.paciente.id)
    );
    this.dataSource.data = newList;
  }
}
