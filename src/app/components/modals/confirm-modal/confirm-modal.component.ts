import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  shift:Shift;
  loading:boolean;
  shiftLoaded:boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {shiftCreated :Shift},
    private shiftSvc:ShiftService
    ){
    this.shift=data.shiftCreated;
    this.loading=false;
    this.shiftLoaded = false;
   }

  ngOnInit(): void {
  }

  confirmShift(){
    this.loading= true;
    setTimeout(() => {
      this.shiftSvc.addShift(this.shift);
      this.loading=false;
      this.shiftLoaded = true;
    }, 2000);
  }
}
