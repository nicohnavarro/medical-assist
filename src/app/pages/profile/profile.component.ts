import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggeado: boolean = false;
  uid: string;
  constructor(private userSvc: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }


  irIngreso() {
    this.router.navigate(['login']);
  }
}
