import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
})
export class RateModalComponent implements OnInit {
  turno: ITurno;
  cargando: boolean;
  turno_cargado: boolean;
  comment: string = '';
  btnEnable: boolean = false;
  rate: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift },
    public dialogRef: MatDialogRef<RateModalComponent>,
    private turnoSvc: TurnoService,
    private userSvc: UserService
  ) {
    this.turno = data.shift;
    this.cargando = false;
    this.turno_cargado = false;
  }

  ngOnInit(): void {}

  validComment(event) {
    this.comment = event;
    event.length > 6 ? (this.btnEnable = true) : (this.btnEnable = false);
  }

  getRate(event) {
    this.rate = event;
  }

  addRating() {
    let calification = { score: this.rate, comment: this.comment };
    this.turno.calificacion = calification;
    if(!this.turno.medico.qualification){
      this.turno.medico.qualification=[];
    }
    this.turno.medico.qualification.push(calification);
    this.turnoSvc.modificarTurno(this.turno, this.turno.id).then(() => {
      this.userSvc
        .modificarUser(this.turno.medico, this.turno.medico.id)
        .then(() => {
          this.dialogRef.close();
          let notyf = new Notyf();
          notyf.success('Se ha calificado el turno. Gracias!');
        });
    });
  }
}
