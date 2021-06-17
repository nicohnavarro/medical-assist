import { AuthService } from './../../services/auth.service';
import { IUser } from './../../models/user';
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
  user: IUser;
  constructor(private userSvc: UserService, private authSvc: AuthService, private router: Router) {
    this.user = this.authSvc.user;
  }

  ngOnInit(): void {
  }


  irIngreso() {
    this.router.navigate(['login']);
  }
}
