import { UserService } from './../../services/user.service';
import { MedicalSpecialtiesService } from './../../services/medical-specialties.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';

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
    const DATA:any = document.getElementById('pdfTable');
    const doc = new jsPDF('p','pt','a4');
    const options = {
      background:'white',
      scale:3,
    }
    html2canvas(DATA,options)
      .then((canvas)=>{
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() -2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult)=>{
        docResult.save('pruebanico.pdf');
      });

  //   const pdfTable = this.pdfTable.nativeElement;
   
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   console.log(html[1].stack[1]);
  //   const documentDefinition = {
  //     pageSize: {
  //     width: 1000,
  //     height: 200
  // },
  // content: html[1],width: 1000,height:100};
  //   pdfMake.createPdf(documentDefinition).open(); 
     
  }

}
