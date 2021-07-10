import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  islogged:boolean=false;
  constructor(private router: Router) {
    if (localStorage.getItem('uid')) {
      this.islogged = true;
    }
  }


  ngOnInit(): void {
  }

}
