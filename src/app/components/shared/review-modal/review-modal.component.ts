import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
})
export class ReviewModalComponent implements OnInit {
  turno: ITurno;
  cargando: boolean;
  turno_cargado: boolean;
  motivo: string = '';
  btnEnable: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift; typeUser },
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    private turnoSvc: TurnoService
  ) {
    this.turno = data.shift;
    this.cargando = false;
    this.turno_cargado = false;
  }

  ngOnInit(): void {}

  validMotivo(event) {
    this.motivo = event;
    event.length > 6 ? (this.btnEnable = true) : (this.btnEnable = false);
  }

  cancelShift() {
    console.log(this.turno);
    this.turno.estado = EstadosTurno.FINALIZADO;
    this.turno.resena = this.motivo;
    this.turnoSvc.modificarTurno(this.turno, this.turno.id).then(() => {
      this.dialogRef.close();
      let notyf = new Notyf();
      notyf.success('Turno Finalizado.');
    });
  }
}
