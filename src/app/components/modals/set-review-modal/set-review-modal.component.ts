import { ShiftStates } from 'src/app/utils/shiftStates.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { UserService } from 'src/app/services/user.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-set-review-modal',
  templateUrl: './set-review-modal.component.html',
  styleUrls: ['./set-review-modal.component.scss'],
})
export class SetReviewModalComponent implements OnInit {
  shift: Shift;
  loading: boolean;
  shiftLoaded: boolean;
  reason: string = '';
  btnEnable: boolean = false;
  medicalHistory: any;
  successMsg:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift:Shift },
    public dialogRef: MatDialogRef<SetReviewModalComponent>,
    private shiftSvc: ShiftService,
    private userSvc: UserService
  ) {
    this.shift = data.shift;
    this.loading = false;
    this.shiftLoaded = false;
    this.successMsg = localStorage.getItem('lang') == 'en' ?
      "Shift ended ✔️":
      "Turno Finalizado ✔️";
  }

  ngOnInit(): void {}

  validReason(event) {
    this.reason = event;
    event.length > 6 && this.medicalHistory
      ? (this.btnEnable = true)
      : (this.btnEnable = false);
  }

  finishShift() {
    console.log(this.shift)
    this.shift.estado = ShiftStates.FINALIZADO;
    this.shift.resena = this.reason;
    this.shift.paciente.record = this.medicalHistory;
    this.shiftSvc.updateShift(this.shift, this.shift.id).then(() => {
      this.userSvc
        .udpateUser(this.shift.paciente, this.shift.paciente.id)
        .then(() => {
          this.dialogRef.close();
          let notyf = new Notyf();
          notyf.success(this.successMsg);
        });
    });
  }

  getMedicalHistory(event) {
    this.medicalHistory = event;
  }
}
