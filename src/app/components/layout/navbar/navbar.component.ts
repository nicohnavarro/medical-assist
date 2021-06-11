import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { UserNav } from './../../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //#region  Attributes
  @Output() openSidebar: EventEmitter<string> = new EventEmitter();
  @Input() user: any;
  //#endregion

  constructor(private router: Router, private userSvc: UserService, private authSvc:AuthService ) { 
    if(localStorage.getItem('uid')){
      this.userSvc.getUserById(localStorage.getItem('uid')).subscribe((data)=>{
        this.user = data;
        console.log(data);
      })
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login']);
  }

  async logout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login'])
    }
    catch (err) {
      console.log(err);
    }
  }


  activateSidebar() {
    this.openSidebar.emit("Open-sideBar");
  }

  showNotif() {
    const notyf = new Notyf({
      types: [
        {
          type: 'info',
          background: 'blue',
          icon: false
        }
      ]
    });

    notyf.open({
      type: 'info',
      message: 'Send us <b>an email</b> to get support'
    });
  }
}
