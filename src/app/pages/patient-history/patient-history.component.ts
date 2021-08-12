import { ExcelService } from './../../services/excel.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/User';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {

  user:User;
  historyAdditional:any[];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private userSvc: UserService, private router: Router,private excelSvc:ExcelService) {
    if (localStorage.getItem('uid')) {
      this.userSvc.getById(localStorage.getItem('uid')).subscribe((data) => {
        this.user = data;
        this.historyAdditional = data.history.map((history)=> history.historyAdditional)
      })
    }
  }

  ngOnInit(): void {
  }

  exportExcel(){
    let jsonHistory = this.user.history.map((history)=> JSON.parse(JSON.stringify(history,history.historyAdditional)));
    this.excelSvc.exportAsExcelFile(jsonHistory,Object.entries(this.user),this.user.name);
  }

}
