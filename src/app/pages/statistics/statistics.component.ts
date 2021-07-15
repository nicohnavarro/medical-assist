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
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  downloading:boolean = false;
  loadingBarChart: boolean = true;
  loadingPieChart: boolean = true;
  loadingHeatMap: boolean = true;
  barData: any[];
  pieData: any[];
  barChart: string;
  pieChart: string;
  heatMapChart: string;

  constructor(
    private medicalSpecialtySvc: MedicalSpecialtiesService,
    private userSvc: UserService
  ) {
    this.medicalSpecialtySvc.getSpecialties().subscribe((specialties) => {
      this.barData = specialties.map((specialty) => {
        return { name: specialty.name, value: specialty?.shifts };
      });
      this.pieData = specialties.map((specialty) => {
        return { name: specialty.name, value: specialty?.doctors || 0 };
      });
    });
    this.loadingBarChart = false;
    this.loadingPieChart = false;
    this.loadingHeatMap = false;
  }

  ngOnInit() {}

  async generateCanvasChart(chart: string): Promise<string> {
    const DATA: any = document.getElementById(chart);
    const options = {
      background: 'white',
      scale: 2,
      removeContainer: false,
      backgroundColor: null,
    };
    const canvas = await html2canvas(DATA, options);
    return canvas.toDataURL('image/PNG');
  }

  async downloadAsPDF() {
    this.downloading = true;
    await this.getImages();
    const doc = new jsPDF.jsPDF('p', 'pt', 'a4') as jsPDFWithPlugin;
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(this.barChart);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.text("Admin Report with charts", 40, 30);
    doc.addImage(
      this.barChart,
      'PNG',
      bufferX,
      bufferY*3,
      pdfWidth,
      pdfHeight,
      undefined,
      'FAST'
    );

    doc.autoTable({
      headStyles: { fillColor: [71, 27, 227] },
      margin: { top: 350 },
      bodyStyles: {
        cellPadding: { top: 10, right: 20, bottom: 10, left: 10 },
        font: 'helvetica',
      },
      body: this.barData,
      columns: [
        { header: 'Name', dataKey: 'name' },
        { header: 'Quantity', dataKey: 'value' },
      ],
    });

    doc.addPage('a4','p');
    const imgPropsPie = (doc as any).getImageProperties(this.pieChart);
    const pdfHeightPie = (imgPropsPie.height * pdfWidth) / imgPropsPie.width;
    doc.text("Pie Chart Doctors by Specialties", 40, 30);
    doc.addImage(
      this.pieChart,
      'PNG',
      bufferX,
      bufferY*3,
      pdfWidth,
      pdfHeightPie,
      undefined,
      'FAST'
    );

    doc.autoTable({
      headStyles: { fillColor: [71, 27, 227] },
      margin: { top: 400 },
      bodyStyles: {
        cellPadding: { top: 10, right: 20, bottom: 10, left: 10 },
        font: 'helvetica',
      },
      body: this.pieData,
      columns: [
        { header: 'Specialties', dataKey: 'name' },
        { header: 'Doctors', dataKey: 'value' },
      ],
    });

    doc.addPage('a4','p');
    const imgPropsHeat = (doc as any).getImageProperties(this.heatMapChart);
    const pdfHeightHeat = (imgPropsHeat.height * pdfWidth) / imgPropsHeat.width;
    doc.text("Heat Map Chart Shifts by Year", 40, 30);
    doc.addImage(
      this.heatMapChart,
      'PNG',
      bufferX,
      bufferY*3,
      pdfWidth,
      pdfHeightHeat,
      undefined,
      'FAST'
    );

    doc.save('AdminReport.pdf');
    this.downloading = false;
    // });
  }

  async getImages() {
    this.barChart = await this.generateCanvasChart('verticalBar');
    this.pieChart = await this.generateCanvasChart('pieChart');
    this.heatMapChart = await this.generateCanvasChart('heatMap');
  }
}
