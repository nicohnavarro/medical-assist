import { Shift } from 'src/app/models/Shift';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-see-review-modal',
  templateUrl: './see-review-modal.component.html',
  styleUrls: ['./see-review-modal.component.scss'],
})
export class SeeReviewModalComponent implements OnInit {
  shift: Shift;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shift:Shift; typeUser:string },
    public dialogRef: MatDialogRef<SeeReviewModalComponent>
  ) {
    this.shift = data.shift;
  }

  ngOnInit(): void {}
}
