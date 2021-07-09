import { AuthService } from './../../services/auth.service';
import { User } from '../../models/User';
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
  user: User;
  constructor(private userSvc: UserService, private router: Router) {
    // this.user = this.authSvc.user;
    if (localStorage.getItem('uid')) {
      this.userSvc.getById(localStorage.getItem('uid')).subscribe((data) => {
        this.user = data;
      })
    }
  }

  ngOnInit(): void {
  }


  goLogin() {
    this.router.navigate(['login']);
  }
}
