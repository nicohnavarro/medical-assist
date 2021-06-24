import { User } from '../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  pacientes:Array<User>=[];
  cargando:boolean=true;
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'domicilio',   
    'correo',
    'edad',
    'editar',
    'borrar'
  ];

  dataSource = new MatTableDataSource<User>(this.pacientes);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private userSvc:UserService,public dialog: MatDialog) { 
    this.pacientes=new Array<User>();
  }
  
  ngOnInit(): void {
    this.getPacientes();
    this.dataSource.paginator = this.paginator;
  }

  getPacientes(){
    this.userSvc.getByType('Paciente').subscribe(data => {
      this.pacientes = data as User[];
      this.dataSource.data = this.pacientes;
      setTimeout(() => {
        
        this.cargando=false;
      }, 2000);
     })
  }

  openDialog(component,options?): void {
    const dialogRef = this.dialog.open(component, options);

    dialogRef.afterClosed().subscribe(result => {
      this.getPacientes();
    });
  }

  editarPaciente(paciente){
    // this.openDialog(AlumnoDetalleComponent,{
    //   width: '60%',
    //   height: 'auto',
    //   maxHeight: '60%',
    //   data: {pacienteDetalle:paciente}});
  }

  eliminarPaciente(paciente){
    // this.openDialog(AlumnoBorradoComponent,{
    //   width: '25%',
    //   data: {paciente:paciente}});
  }
}
