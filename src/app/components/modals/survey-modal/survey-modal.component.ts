import { ShiftStates } from './../../../utils/shiftStates.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.scss']
})
export class SurveyModalComponent implements OnInit {
  shift: Shift;
  loading: boolean;
  shiftLoaded: boolean;
  btnEnable: boolean = false;
  field1:string;
  field2:string;
  field3:string;
  value1:number;
  value2:number;
  value3:number;
  successMsg:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift },
    public dialogRef: MatDialogRef<SurveyModalComponent>,
    private shiftSvc: ShiftService
  ) {
    this.shift = data.shift;
    this.loading = false;
    this.shiftLoaded = false;
    this.field1 = 'servicio';
    this.field2 = 'diagnostico';
    this.field3 = 'atencion';
    this.successMsg = localStorage.getItem('lang') == 'en' ?
    "Survey completed ✔️":
    "Encuenta completada ✔️";
  }

  ngOnInit(): void { }

  validSurvey() {
    (this.value1 && this.value2 && this.value3)
      ? (this.btnEnable = true)
      : (this.btnEnable = false);
  }

  getValue1(e:number){
    this.value1 =e
    this.validSurvey()
  }
  getValue2(e:number){
    this.value2 =e
    this.validSurvey()
  }
  getValue3(e:number){
    this.value3 =e
    this.validSurvey()
  }

  addSurvey() {
    let survey = [{
      'servicio': this.value1,
      'diagnostico': this.value2,
      'atencion':this.value3
    }]
    this.shift.encuesta = survey;
    this.shiftSvc.updateShift(this.shift, this.shift.id).then(() => {
      this.dialogRef.close();
      let notyf = new Notyf();
      notyf.success(this.successMsg);
    });
  }

}
