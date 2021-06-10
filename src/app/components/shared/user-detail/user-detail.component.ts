import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() nombre:string;
  @Input() apellido:string;
  @Input() domicilio:string;
  @Input() edad:string;
  @Input() correo:string;
  @Input() imagen_uno:string;
  @Input() imagen_dos:string;
  @Input() tipo:string;
  @Input() especialidades:string[];
  constructor() {
    this.especialidades = [];
   }

  ngOnInit(): void {
  }

}
