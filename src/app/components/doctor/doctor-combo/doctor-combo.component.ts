import { IUser } from 'src/app/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-combo',
  templateUrl: './doctor-combo.component.html',
  styleUrls: ['./doctor-combo.component.scss']
})
export class DoctorComboComponent implements OnInit {

  @Input() eligio_especialidad:boolean; 
  @Input() medicos:IUser[];
  @Output() seleccionaMedico:EventEmitter<IUser> = new EventEmitter<IUser>();
  @Input() medico_mostrar:IUser;
  constructor(private userSvc:UserService) {
  }

  ngOnInit(): void {
  }

  onOptionsSelected(id:string){
    this.userSvc.getById(id).subscribe(medico=>{
      this.seleccionaMedico.emit(medico as IUser);
    })    
  }

}
