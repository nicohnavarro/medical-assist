import { MedicalSpecialtiesService } from './../../services/medical-specialties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  barData:any[];
  constructor(private medicalSpecialtySvc:MedicalSpecialtiesService) { 
    this.medicalSpecialtySvc.getSpecialties().subscribe((specialties) => {
      this.barData = specialties.map((specialty) => { return ({ 'name': specialty.name, 'value': specialty?.shifts }) })
    })
  }

  ngOnInit(): void {
  }

}
