import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMedico } from 'src/app/models/medico';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-combo-profesional',
  templateUrl: './combo-profesional.component.html',
  styleUrls: ['./combo-profesional.component.scss']
})
export class ComboProfesionalComponent implements OnInit {

  @Input() eligio_especialidad:boolean; 
  @Input() medicos:IMedico[];
  @Output() seleccionaMedico:EventEmitter<IMedico> = new EventEmitter<IMedico>();
  @Input() medico_mostrar:IMedico;
  constructor(private userSvc:UserService) {
  }

  ngOnInit(): void {
  }

  onOptionsSelected(id:string){
    this.userSvc.getById(id).subscribe(medico=>{
      this.seleccionaMedico.emit(medico as IMedico);
    })    
  }

}
