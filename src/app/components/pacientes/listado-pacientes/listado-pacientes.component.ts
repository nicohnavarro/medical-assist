import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaciente } from 'src/app/models/paciente';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit {

  pacientes:Array<IPaciente>=[];
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

  dataSource = new MatTableDataSource<IPaciente>(this.pacientes);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private userSvc:UserService,public dialog: MatDialog) { 
    this.pacientes=new Array<IPaciente>();
  }
  
  ngOnInit(): void {
    this.getPacientes();
    this.dataSource.paginator = this.paginator;
  }

  getPacientes(){
    this.userSvc.getPacientes().subscribe(data => {
      this.pacientes = data;
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
