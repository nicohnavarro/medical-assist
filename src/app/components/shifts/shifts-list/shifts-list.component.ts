import { ShiftStates } from './../../../utils/shiftStates.enum';
import { SeeReviewModalComponent } from '../../modals/see-review-modal/see-review-modal.component';
import { RateModalComponent } from './../../modals/rate-modal/rate-modal.component';
import { SurveyModalComponent } from './../../modals/survey-modal/survey-modal.component';
import { SetReviewModalComponent } from '../../modals/set-review-modal/set-review-modal.component';
import { CancelModalComponent } from './../../modals/cancel-modal/cancel-modal.component';

import { AuthService } from '../../../services/auth.service';
import { MedicalSpecialtiesService } from '../../../services/medical-specialties.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { UserService } from 'src/app/services/user.service';

import { Notyf } from 'notyf';
@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.scss'],
})
export class ShiftsListComponent implements OnInit {
  States = ShiftStates;
  Specialties = [];
  Doctors = [];
  Patients = [];
  successMsg:string;
  @Input() showShifts: Array<Shift> = [];
  @Input() pastShifts: boolean = false;
  loading: boolean = true;
  typeUser: string = '';
  displayedColumns: string[] = [
    'specialty',
    'doctor',
    'patient',
    'date',
    'hour',
    'state',
    'attend',
    'cancel',
    'finish',
    'survey',
    'review',
  ];

  dialogConfig: MatDialogConfig;
  dataSource = new MatTableDataSource<Shift>(this.showShifts);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userSvc: UserService,
    private shiftSvc: ShiftService,
    public dialog: MatDialog,
    private specialtiesSvc: MedicalSpecialtiesService,
    private authSvc: AuthService
  ) {

    this.typeUser = authSvc.user?.type;
    this.setPatientOptions(this.typeUser);

    specialtiesSvc.getSpecialties().subscribe((data) => {
      this.Specialties = data.map((item) => {
        return { ...item, completed: true };
      });
    });

    userSvc.getByType('doctor').subscribe((data) => {
      this.Doctors = data.map((item) => {
        return { ...item, completed: true };
      });
    });

    userSvc.getByType('patient').subscribe((data) => {
      this.Patients = data.map((item) => {
        return { ...item, completed: true };
      });
    });

    this.successMsg = localStorage.getItem('lang') == 'en' ?
    "Shift accepted":
    "Turno Aceptado";

  }

  private setPatientOptions(type: string) {
    if (type == 'patient') {
      let removeId = this.displayedColumns.indexOf('attend');
      this.displayedColumns.splice(removeId, 1);
      let finishId = this.displayedColumns.indexOf('finish');
      this.displayedColumns.splice(finishId, 1);
      this.displayedColumns.push('qualify');
    }
    else if (type == 'doctor') {
      let removeId = this.displayedColumns.indexOf('survey');
      this.displayedColumns.splice(removeId, 1);
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.dataSource.data = this.showShifts;
      this.dataSource.paginator = this.paginator;
    }, 4000);
    this.setDialogConfig();
  }

  private setDialogConfig() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'custom-modalbox';
    this.dialogConfig.maxWidth = '60vw';
  }

  getShifts() {
    this.dataSource.data = this.showShifts;
  }

  openDialog(component, options?): void {
    const dialogRef = this.dialog.open(component, options);
    dialogRef.afterClosed().subscribe((result) => {
      this.getShifts();
    });
  }

  changeStateShift(action: string, shift: Shift, typeUser: string) {
    this.dialogConfig.data = {
      shift,
      typeUser,
    };

    switch (action) {
      case 'ACEPTAR':
        shift.estado = ShiftStates.ACEPTADO;
        this.shiftSvc.updateShift(shift, shift.id).then(() => {
          let notyf = new Notyf();
          notyf.success(this.successMsg);
          this.getShifts();
        });
        break;
      case 'CANCELAR':
        let dialogRef = this.dialog.open(CancelModalComponent, this.dialogConfig);
        dialogRef.afterClosed().subscribe((result) => {
          this.getShifts();
        });
        break;
      case 'FINALIZADO':
        let reviewModal = this.dialog.open(SetReviewModalComponent, this.dialogConfig);
        reviewModal.afterClosed().subscribe((result) => {
          this.getShifts();
        });
        break;
    }
  }

  addSurvey(shift: Shift) {
    this.dialogConfig.data = {
      shift,
    };
    const dialogRef = this.dialog.open(SurveyModalComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  addRate(shift: Shift) {
    this.dialogConfig.data = {
      shift,
    };
    const dialogRef = this.dialog.open(RateModalComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  seeReview(shift: Shift) {
    this.dialogConfig.data = {
      shift,
    };
    const dialogRef = this.dialog.open(SeeReviewModalComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  getFilterSpecialties(filter: any[]) {
    let onlyName = filter.map((t) => t.name);
    let newList = this.showShifts.filter((t) =>
      onlyName.includes(t.especialidad.name)
    );
    this.dataSource.data = newList;
  }

  getFilterDoctors(filter: any[]) {
    let doctorIds = filter.map((doctor) => doctor.id);
    let newList = this.showShifts.filter((t) =>
      doctorIds.includes(t.medico.id)
    );
    this.dataSource.data = newList;
  }

  getFilterPatients(filter: any[]) {
    let patientIds = filter.map((patient) => patient.id);
    let newList = this.showShifts.filter((t) =>
      patientIds.includes(t.paciente.id)
    );
    this.dataSource.data = newList;
  }
}
