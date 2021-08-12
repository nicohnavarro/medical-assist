import { ExcelService } from './../../services/excel.service';
import { User } from '../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import html2canvas from 'html2canvas';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF.jsPDF {
  autoTable: (options: UserOptions) => jsPDF.jsPDF;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  pacientes:Array<User>=[];
  cargando:boolean=true;
  displayedColumns: string[] = [
    'image',
    'nombre',
    'apellido',
    'domicilio',   
    'correo',
    'edad',
    'descargarExcel',
    'descargarPdf'
  ];

  dataSource = new MatTableDataSource<User>(this.pacientes);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private userSvc:UserService,public dialog: MatDialog,private excelSvc:ExcelService) { 
    this.pacientes=new Array<User>();
  }
  
  ngOnInit(): void {
    this.getPacientes();
    this.dataSource.paginator = this.paginator;
  }

  getPacientes(){
    this.userSvc.getByType('patient').subscribe(data => {
      this.pacientes = data as User[];
      this.dataSource.data = this.pacientes;
      setTimeout(() => {
        
        this.cargando=false;
      }, 2000);
     })
  }

  openDialog(component,options?): void {
    const dialogRef = this.dialog.open(component, options);

    dialogRef.afterClosed().subscribe(result => {
      this.getPacientes();
    });
  }

  exportPdf(paciente){
    const doc = new jsPDF.jsPDF('p', 'pt', 'a4') as jsPDFWithPlugin;
    const bufferX = 15;
    const bufferY = 15;
    let patientData = Object.entries(paciente);
    doc.text("Patient Report", 40, 30);

    doc.autoTable({
      headStyles: { fillColor: [71, 27, 227] },
      bodyStyles: {
        cellPadding: { top: 10, right: 20, bottom: 10, left: 10 },
        font: 'helvetica',
      },
      body: patientData,
      columns: [
        { header: 'Name', dataKey: 'key' },
        { header: 'Value', dataKey: 'value' },
      ],
    });

    paciente.history.forEach((valor, indice, array) => {
      const{historyAdditional,...data} = valor.history;
      let historyData = Object.entries(data);
      historyData.concat(Object.entries(historyAdditional))
      console.log(historyData);
      doc.addPage('a4','p');
      doc.text("History Report: "+ valor.date + valor.especialidad, 40, 30);
          doc.autoTable({
      headStyles: { fillColor: [71, 27, 227] },
      bodyStyles: {
        cellPadding: { top: 10, right: 20, bottom: 10, left: 10 },
        font: 'helvetica',
      },
      body: historyData,
      columns: [
        { header: 'Fields', dataKey: 'key' },
        { header: 'Values', dataKey: 'value' },
      ],
    });
    })
    doc.save(`${paciente.name}-${new Date().getTime()}.pdf`);
  }

  exportExcel(paciente){
    let jsonHistory = paciente.history.map((history)=> JSON.parse(JSON.stringify(history,history.historyAdditional)));
    this.excelSvc.exportAsExcelFile(jsonHistory,Object.entries(paciente),paciente.name);
  }
}
