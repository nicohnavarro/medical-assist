import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMedico } from 'src/app/models/medico';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.scss']
})
export class ListadoProfesionalesComponent implements OnInit {

  medicos:Array<IMedico>=[];
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

  dataSource = new MatTableDataSource<IMedico>(this.medicos);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private userSvc:UserService,public dialog: MatDialog) { 
    this.medicos=new Array<IMedico>();
  }
  
  ngOnInit(): void {
    this.getMedicos();
    this.dataSource.paginator = this.paginator;
  }

  getMedicos(){
    this.userSvc.getMedicos().subscribe(data => {
      this.medicos = data;
      this.dataSource.data = this.medicos;
      setTimeout(() => {
        
        this.cargando=false;
      }, 2000);
     })
  }

  openDialog(component,options?): void {
    const dialogRef = this.dialog.open(component, options);

    dialogRef.afterClosed().subscribe(result => {
      this.getMedicos();
    });
  }

  editarMedico(medico){
    // this.openDialog(AlumnoDetalleComponent,{
    //   width: '60%',
    //   height: 'auto',
    //   maxHeight: '60%',
    //   data: {pacienteDetalle:paciente}});
  }

  eliminarMedico(medico){
    // this.openDialog(AlumnoBorradoComponent,{
    //   width: '25%',
    //   data: {paciente:paciente}});
  }
}
