import { MedicalSpecialty } from './../../../models/MedicalSpecialty';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-specialties',
  templateUrl: './combo-specialties.component.html',
  styleUrls: ['./combo-specialties.component.scss']
})
export class ComboSpecialtiesComponent implements OnInit {
  @Input() specialties: MedicalSpecialty[];
  @Output() selectedItem:EventEmitter<MedicalSpecialty> = new EventEmitter<MedicalSpecialty>();
  constructor() { }

  ngOnInit(): void {
  }

  onOptionsSelected(specialty:MedicalSpecialty){
    this.selectedItem.emit(specialty);
  }
}
