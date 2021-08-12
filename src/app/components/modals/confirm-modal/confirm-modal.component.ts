import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Shift } from 'src/app/models/Shift';
import { ShiftService } from 'src/app/services/shift.service';
import { MedicalSpecialtiesService } from 'src/app/services/medical-specialties.service';

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
    private shiftSvc:ShiftService,
    private medicalSpecialtySvc:MedicalSpecialtiesService
    ){
    this.shift=data.shiftCreated;
    this.loading=false;
    this.shiftLoaded = false;
   }

  ngOnInit(): void {
  }

  confirmShift(){
    this.loading= true;
    this.shift.especialidad.shifts ? this.shift.especialidad.shifts = this.shift.especialidad.shifts+1: this.shift.especialidad.shifts=1
    if(this.shift.especialidad.patients){
      if(!this.shift.especialidad.patients.includes(this.shift.paciente.id)){
        this.shift.especialidad.patients.push(this.shift.paciente.id);
      }
    }
    else{
      this.shift.especialidad.patients = [this.shift.paciente.id];
    }
    setTimeout(() => {
      this.shiftSvc.addShift(this.shift);
      this.medicalSpecialtySvc.updateSpecialty(this.shift.especialidad,this.shift.especialidad.id);
      this.loading=false;
      this.shiftLoaded = true;
    }, 2000);
  }
}
