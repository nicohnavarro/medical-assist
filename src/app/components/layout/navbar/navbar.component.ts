import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

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

  constructor(private router: Router, private userSvc: UserService, private authSvc: AuthService) {
    if (localStorage.getItem('uid')) {
      this.userSvc.getById(localStorage.getItem('uid')).subscribe((data) => {
        this.authSvc.user = data;
        this.user = data;
      })
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login']);
  }

  async logOut() {
    try {
      await this.authSvc.logOut();
      localStorage.removeItem('uid')
      this.router.navigate(['/login'])
    }
    catch (err) {
      this.showNotif('red',err.message);
    }
  }


  activateSidebar() {
    this.openSidebar.emit("Open-sideBar");
  }

  showNotif(color:string,message:string) {
    const notyf = new Notyf({
      types: [
        {
          type: 'info',
          background: color,
          icon: false
        }
      ]
    });

    notyf.open({
      type: 'info',
      message: message
    });
  }
}
