import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/shared/confirm-modal/confirm-modal.component';
import { IMedico } from 'src/app/models/medico';
import { IPaciente } from 'src/app/models/paciente';
import { ITurno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Dias } from 'src/app/utils/dias.enum';
import { Especialidades } from 'src/app/utils/especialidades.enum';
import { EstadosTurno } from 'src/app/utils/estados-turno.enum';
import { getHorarios, getQuincena } from 'src/app/utils/helpers';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {

  turno_especialidad: Especialidades;
  turno_medico: IMedico;
  turno_dia: string;
  turno_hora: string;
  lista_medicos: IMedico[];
  lista_filtrada_medicos: IMedico[];
  lista_filtrada_dias: string[];
  lista_filtrada_horarios: string[];
  tiene_especialidad: boolean = false;
  tiene_medico: boolean = false;
  tiene_dia: boolean = false;
  turno_paciente:IPaciente;
  loggeado:boolean = false;

  constructor(private userSvc: UserService, public dialog: MatDialog,private authSvc:AuthService,private router:Router) {
    if(this.authSvc.user){
      this.loggeado=true;
      this.lista_medicos = [];
      this.lista_filtrada_medicos = [];
      this.lista_filtrada_dias = [];
      this.lista_filtrada_horarios = [];
      this.userSvc.getByType('Medico').subscribe(data => {
        this.lista_medicos = data as IMedico[];
      });
      this.userSvc.getById(this.authSvc.user.uid).subscribe(paciente=>{
        this.turno_paciente = paciente;
      })
    }
  }

  ngOnInit(): void {
  }

  mandamosEspecialidad(especialidad: Especialidades) {
    this.cleanFilter();
    this.turno_especialidad = especialidad;
    this.filtrarMedicosByEspecialidad(especialidad);
    this.tiene_especialidad = true;
  }

  mandamosMedico(medico: IMedico) {
    this.turno_dia = null;
    this.turno_hora = null;
    this.turno_medico = medico;
    this.filtrarDiasByMedico(medico);
    this.tiene_medico = true;
  }

  mandamosDia(dia: string) {
    this.turno_dia = dia;
    this.tiene_dia = true;
    this.filtrarHoraByDia(dia);

  }

  mandamosHora(hora: string) {
    this.turno_hora = hora;
    this.openDialog();
    console.log(hora);
  }

  filtrarMedicosByEspecialidad(especialidad: Especialidades) {
    let filtrada = this.lista_medicos.filter(medico => {
      if (medico.especialidades.includes(especialidad.toString()))
        return medico;
    });
    this.lista_filtrada_medicos = filtrada;
  }

  filtrarDiasByMedico(medico: IMedico) {
    let dias = medico.dias_laborables.map(dia => {
      return dia.split('=')[0];
    }).map(dia => {
      return Dias[+dia[0]];
    });

    let quincenaFiltrada = getQuincena().filter((dia) => {
      let diaNombre = dia.split("-")[0];
      if (dias.includes(diaNombre)) { return dia };
    });
    this.lista_filtrada_dias = quincenaFiltrada;
  }

  filtrarHoraByDia(dia: string) {
    this.lista_filtrada_horarios = getHorarios();
  }

  cleanFilter() {
    this.tiene_especialidad = false;
    this.lista_filtrada_medicos = [];
    this.turno_medico = null;
    this.tiene_medico = false;
    this.lista_filtrada_dias = [];
    this.lista_filtrada_horarios = [];
    this.tiene_dia = false;
    this.turno_dia = null;
    this.turno_hora = null;
  }

  async openDialog() {
    let turno:ITurno ={
      especialidad : this.turno_especialidad,
      medico : this.turno_medico,
      fecha : this.turno_dia,
      hora : this.turno_hora,
      paciente: this.turno_paciente,
      estado:0,
    };
    

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        turno
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  irIngreso(){
this.router.navigate(['login']);
  }

}
