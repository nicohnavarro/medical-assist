import { ToastNotyf } from './../../../utils/toastNotyf';
import { ShiftStates } from 'src/app/utils/shiftStates.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  shift: Shift;
  loading: boolean;
  shiftLoaded: boolean;
  response: string = '';
  btnEnable: boolean = false;
  successMsg:string;
  typeUser:string;
  value1:number;
  value2:number;
  error:boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift:Shift; typeUser:string },
    public dialogRef: MatDialogRef<CaptchaComponent>,
    private turnoSvc: ShiftService
  ) {
    this.shift = data.shift;
    this.error = false;
    this.value1 = Math.floor(Math.random() * 100);
    this.value2 = Math.floor(Math.random() * 100);
    this.loading = false;
    this.shiftLoaded = false;
    this.typeUser = data.typeUser;

    this.successMsg = localStorage.getItem('lang') == 'en' ?
    "Shift accepted":
    "Turno Aceptado";
  }

  ngOnInit(): void {}

  validResponse(event) {
    this.response = event;
  }

  cancelShift() {
    let result = this.value1+this.value2;
    console.log(result);
    console.log(this.response);
    if(+this.response === this.value1+this.value2){
      this.error = false;
      this.shift.estado = ShiftStates.ACEPTADO;
       this.turnoSvc.updateShift(this.shift, this.shift.id).then(() => {
         this.dialogRef.close();
         let notyf = ToastNotyf;
         notyf.open({
           type: 'info',
           message: this.successMsg
         });
       });
    }
    else{
      this.error = true;
    }
  }
}
