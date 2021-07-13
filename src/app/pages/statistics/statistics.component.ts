import { UserService } from './../../services/user.service';
import { MedicalSpecialtiesService } from './../../services/medical-specialties.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;

  barData:any[];
  pieData:any[];
  constructor(private medicalSpecialtySvc:MedicalSpecialtiesService,private userSvc:UserService) { 
    this.medicalSpecialtySvc.getSpecialties().subscribe((specialties) => {
      this.barData = specialties.map((specialty) => { return ({ 'name': specialty.name, 'value': specialty?.shifts }) })
      this.pieData = specialties.map((specialty) => { return ({ 'name': specialty.name, 'value': specialty?.doctors || 0 }) })
    })
  }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
    console.log(html[1].stack[1]);
    const documentDefinition = { content: html[1],width: 1000,height:100};
    pdfMake.createPdf(documentDefinition).open(); 
     
  }

}
