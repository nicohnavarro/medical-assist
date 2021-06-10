import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
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
