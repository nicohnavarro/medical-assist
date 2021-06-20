import { ToastNotyf } from './../../../utils/toastNotyf';
import { ShiftStates } from 'src/app/utils/shiftStates.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.scss'],
})
export class CancelModalComponent implements OnInit {
  shift: Shift;
  laoding: boolean;
  shiftLoaded: boolean;
  reason: string = '';
  btnEnable: boolean = false;
  successMsg:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift:Shift; typeUser:string },
    public dialogRef: MatDialogRef<CancelModalComponent>,
    private turnoSvc: ShiftService
  ) {
    this.shift = data.shift;
    this.laoding = false;
    this.shiftLoaded = false;

    this.successMsg = localStorage.getItem('lang') == 'en' ?
    "Shift cancelled":
    "Turno Cancelado";
  }

  ngOnInit(): void {}

  validReason(event) {
    this.reason = event;
    event.length > 6 ? (this.btnEnable = true) : (this.btnEnable = false);
  }

  cancelShift() {
    this.shift.estado = ShiftStates.CANCELADO_MEDICO;
    this.shift.motivoRechazo = this.reason;
    this.turnoSvc.updateShift(this.shift, this.shift.id).then(() => {
      this.dialogRef.close();
      let notyf = ToastNotyf;
      notyf.open({
        type: 'warning',
        message: this.successMsg
      });
    });
  }
}
