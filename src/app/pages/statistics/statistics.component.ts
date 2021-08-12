import { Specialties } from './../../utils/specialties.enum';
import { ShiftService } from './../../services/shift.service';
import { UserService } from './../../services/user.service';
import { MedicalSpecialtiesService } from './../../services/medical-specialties.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Shift } from 'src/app/models/Shift';

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
  downloading: boolean = false;
  specialties: string[];
  loadingBarChart: boolean = true;
  loadingPieChart: boolean = true;
  loadingHeatMap: boolean = true;
  barData: any[];
  columnData: any[];
  columnData2: any[];
  barHighChartData: any[];
  barHighChartData2: any[];
  pieData: any[];
  pieData2: any[];
  pieData3: any[];
  barChart: string;
  pieChart: string;
  heatMapChart: string;

  constructor(
    private medicalSpecialtySvc: MedicalSpecialtiesService,
    private userSvc: UserService,
    private shiftSvc: ShiftService
  ) {
    this.medicalSpecialtySvc.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties.map((aux) => aux.name)
      this.barData = specialties.map((specialty) => {
        return { name: specialty.name, value: specialty?.shifts };
      });
      this.pieData = specialties.map((specialty) => {
        return { name: specialty.name, value: specialty?.doctors || 0 };
      });
      this.pieData2 = specialties.map((specialty) => {
        return { name: specialty.name, y: specialty?.doctors || 0 };
      });
      this.pieData3 = specialties.map((specialty) => {
        return { name: specialty.name, y: specialty?.patients?.length || 0 };
      });
    });
    this.shiftSvc.getShifts().subscribe((shifts) => {
      this.userSvc.getByType('doctor').subscribe((doctors) => {
        this.barHighChartData = this.getShiftsEnds(doctors, shifts);
        this.barHighChartData2 = this.getShiftsActive(doctors, shifts);
        this.columnData = this.getShiftByDay(shifts);
        this.columnData2 = this.getShiftsBySpecialty(shifts,this.specialties);
      })
    })

    this.loadingBarChart = false;
    this.loadingPieChart = false;
    this.loadingHeatMap = false;
  }

  ngOnInit() { }

  private getShiftsEnds(doctors: any[], shifts: any[]): any[] {
    let cant: Array<any> = [];
    const date: Date = new Date();
    date.setDate(-7);
    doctors.forEach((d, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: `${d.name} ${d.surname}`
      });
      shifts.forEach(t => {
        if (t.medico.id === d.id && t.estado === 0 && new Date(t.fecha.split('-')[1]) >= date) cant[index].data[0]++;
      });
    });

    return cant;
  }

  private getShiftsBySpecialty(shifts: Array<Shift>, specialties: Array<string>) {
    let cant: Array<any> = []
    specialties.forEach((a, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: specialties[index]
      })
      shifts.forEach((t: any) => {
        if (t.especialidad.name === a) cant[index].data[0]++;
      });
    });

    return cant;
  }

  private getShiftByDay(shifts: Array<Shift>) {
    let cant: Array<any> = []
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach((c, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: days[index]
      })
      shifts.forEach(t => {

        if (new Date(t.fecha.split('-')[1]).getDay() === index) cant[index].data[0]++;
      });
    });

    return cant;
  }

  private getShiftsActive(doctors: any[], shifts: any[]): any[] {
    let cant: Array<any> = [];
    const date: Date = new Date();
    date.setDate(-7);
    doctors.forEach((d, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: `${d.name} ${d.surname}`
      });
      shifts.forEach(t => {
        if (t.medico.id === d.id && t.estado > 1 && new Date(t.fecha.split('-')[1]) >= date) cant[index].data[0]++;
      });
    });

    return cant;
  }


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
      bufferY * 3,
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

    doc.addPage('a4', 'p');
    const imgPropsPie = (doc as any).getImageProperties(this.pieChart);
    const pdfHeightPie = (imgPropsPie.height * pdfWidth) / imgPropsPie.width;
    doc.text("Pie Chart Doctors by Specialties", 40, 30);
    doc.addImage(
      this.pieChart,
      'PNG',
      bufferX,
      bufferY * 3,
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

    doc.addPage('a4', 'p');
    const imgPropsHeat = (doc as any).getImageProperties(this.heatMapChart);
    const pdfHeightHeat = (imgPropsHeat.height * pdfWidth) / imgPropsHeat.width;
    doc.text("Heat Map Chart Shifts by Year", 40, 30);
    doc.addImage(
      this.heatMapChart,
      'PNG',
      bufferX,
      bufferY * 3,
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
