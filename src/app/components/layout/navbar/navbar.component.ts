import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() selectedTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openSidebar:EventEmitter<any> = new EventEmitter();
  @Input() usuario;
  ingreso_usuario:boolean;
  checked:boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checked = localStorage.getItem('lang') == 'en' ? true: false;
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.selectedTheme.emit(checked);
  }

  async logOut(){
    try{
      // await this.authSvc.logout();
      this.router.navigate(['/login'])
    }
    catch(err){
      console.log(err);
    }
  }

  goLogin(){
    this.router.navigate(['login']);
  }

  activateSidebar(){
    this.openSidebar.emit("abri el sideBar");
  }

  prueba() {
    //   const notyf = new Notyf({
    //     types: [
    //       {
    //         type: 'info',
    //         background: 'blue',
    //         icon: false
    //       }
    //     ]
    //   });

    //   notyf.open({
    //     type: 'info',
    //     message: 'Send us <b>an email</b> to get support'
    //   });
    // }
    this.router.navigate(['login'])
  }
}
