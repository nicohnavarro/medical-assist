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
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private userSvc: UserService, private router: Router) {
    if (localStorage.getItem('uid')) {
      this.userSvc.getById(localStorage.getItem('uid')).subscribe((data) => {
        this.user = data;
      })
    }
  }

  ngOnInit(): void {
  }

}
