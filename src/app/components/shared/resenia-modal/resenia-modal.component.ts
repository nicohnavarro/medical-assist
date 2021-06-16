import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITurno } from 'src/app/models/turno';

@Component({
  selector: 'app-resenia-modal',
  templateUrl: './resenia-modal.component.html',
  styleUrls: ['./resenia-modal.component.scss'],
})
export class ReseniaModalComponent implements OnInit {
  turno: ITurno;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift; typeUser },
    public dialogRef: MatDialogRef<ReseniaModalComponent>
  ) {
    this.turno = data.shift;
  }

  ngOnInit(): void {}
}
