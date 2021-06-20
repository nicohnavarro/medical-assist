import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { UserService } from 'src/app/services/user.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
})
export class RateModalComponent implements OnInit {
  shift: Shift;
  loading: boolean;
  shiftLoaded: boolean;
  comment: string = '';
  btnEnable: boolean = false;
  rate: number;
  successMsg:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift },
    public dialogRef: MatDialogRef<RateModalComponent>,
    private shiftSvc: ShiftService,
    private userSvc: UserService
  ) {
    this.shift = data.shift;
    this.loading = false;
    this.shiftLoaded = false;
    this.successMsg = localStorage.getItem('lang') == 'en' ?
    "Qualified shift ✔️":
    "Turno calificado ✔️";
  }

  ngOnInit(): void {}

  validComment(event:string) {
    this.comment = event;
    event.length > 6 ? (this.btnEnable = true) : (this.btnEnable = false);
  }

  getRate(event) {
    this.rate = event;
  }

  addRating() {
    let qualification = { score: this.rate, comment: this.comment };
    this.shift.calificacion = qualification;
    if(!this.shift.medico.qualification){
      this.shift.medico.qualification=[];
    }
    this.shift.medico.qualification.push(qualification);
    this.shiftSvc.updateShift(this.shift, this.shift.id).then(() => {
      this.userSvc
        .udpateUser(this.shift.medico, this.shift.medico.id)
        .then(() => {
          this.dialogRef.close();
          let notyf = new Notyf();
          notyf.success(this.successMsg);
        });
    });
  }
}
