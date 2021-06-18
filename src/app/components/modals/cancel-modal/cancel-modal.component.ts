import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.scss'],
})
export class CancelModalComponent implements OnInit {
  turno: ITurno;
  cargando: boolean;
  turno_cargado: boolean;
  motivo: string = '';
  btnEnable: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift; typeUser },
    public dialogRef: MatDialogRef<CancelModalComponent>,
    private turnoSvc: TurnoService
  ) {
    console.log(data.shift);
    console.log(data.typeUser);
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
    this.turno.estado = EstadosTurno.CANCELADO_MEDICO;
    this.turno.motivoRechazo = this.motivo;
    this.turnoSvc.modificarTurno(this.turno, this.turno.id).then(() => {
      this.dialogRef.close();
      let notyf = new Notyf();
      notyf.error('El turno ha sido cancelado.');
    });
  }
}
