import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.scss']
})
export class SurveyModalComponent implements OnInit {
  turno: ITurno;
  cargando: boolean;
  turno_cargado: boolean;
  btnEnable: boolean = false;
  field1:string;
  field2:string;
  field3:string;
  value1:number;
  value2:number;
  value3:number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift },
    public dialogRef: MatDialogRef<SurveyModalComponent>,
    private turnoSvc: TurnoService
  ) {
    this.turno = data.shift;
    this.cargando = false;
    this.turno_cargado = false;
    this.field1 = 'servicio';
    this.field2 = 'diagnostico';
    this.field3 = 'atencion';
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
    let encuesta = [{
      'servicio': this.value1,
      'diagnostico': this.value2,
      'atencion':this.value3
    }]
    this.turno.encuesta = encuesta;
    this.turnoSvc.modificarTurno(this.turno, this.turno.id).then(() => {
      this.dialogRef.close();
      let notyf = new Notyf();
      notyf.success('Encuenta Completada.');
    });
  }

}
