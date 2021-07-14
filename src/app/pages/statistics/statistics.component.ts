import { UserService } from './../../services/user.service';
import { MedicalSpecialtiesService } from './../../services/medical-specialties.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF.jsPDF {
  autoTable: (options: UserOptions) => jsPDF.jsPDF;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;

  barData: any[];
  pieData: any[];
  constructor(private medicalSpecialtySvc: MedicalSpecialtiesService, private userSvc: UserService) {
    this.medicalSpecialtySvc.getSpecialties().subscribe((specialties) => {
      this.barData = specialties.map((specialty) => { return ({ 'name': specialty.name, 'value': specialty?.shifts }) })
      this.pieData = specialties.map((specialty) => { return ({ 'name': specialty.name, 'value': specialty?.doctors || 0 }) })
    })
  }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    const DATA: any = document.getElementById('heatMap');
    const doc = new jsPDF.jsPDF('p', 'pt', 'a4') as jsPDFWithPlugin;

    doc.autoTable({
      head: [['Name', 'Email', 'Country']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Norway']
      ]
    });

    const options = {
      background: 'white',
      scale: 1,
    }
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        const columns = [
          { title: "Name", dataKey: "name" },
          { title: "Quantity", dataKey: "value" }
        ];

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
      .then((docResult) => {
        doc.autoTable({
          headStyles: {fillColor: [71, 27, 227]},
          margin: { top: 10 },
          bodyStyles:{cellPadding:{top: 10, right: 20, bottom: 10, left: 10},font:'helvetica'},
          body: this.barData,
          columns: [
            { header: 'Name', dataKey: 'name' },
            { header: 'Quantity', dataKey: 'value' },
          ],
        });
        docResult.save('pruebanico.pdf');
      });

  }

}
