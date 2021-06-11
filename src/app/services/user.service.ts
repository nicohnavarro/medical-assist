import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMedico } from '../models/medico';
import { IPaciente } from '../models/paciente';
import { IAdmin } from '../models/admin';
import { Dias } from '../utils/dias.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFirestore) { }

  getUsers():Observable<any[]> {
    return this.db.collection<IAdmin>('usuarios').valueChanges({idField: 'docId'});
  }
  agregarUser(user:IUser,id:string){
    return this.db.collection('usuarios').doc(id).set(user);
  }

  getUserById(id:string):Observable<IUser>{
    const usersDocuments = this.db.doc<IUser>('usuarios/' + id);
    return usersDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  setUser(id:string){
    this.getUserById(id).subscribe((data)=>{
      return data;
    });
  }

  getAdmins(): Observable<IAdmin[]> {
    return this.db.collection<IAdmin>('administradores').valueChanges({idField: 'docId'});
  }

  agregarAdmin(user: IUser): void {
    let admin:IAdmin = {
      name:user.name,
      surname:user.surname,
      address:user.address,
      age:user.age,
      mail:user.mail,
      password:user.password,
      first_image:user.first_image,
      second_image:user.second_image,
      type: 'Admin'
    }
    this.db.collection<IAdmin>('administradores').add(admin);
  }

  getPacientes(): Observable<IPaciente[]> {
    return this.db.collection<IPaciente>('pacientes').valueChanges({idField: 'docId'});
  }

  getPacienteById(id:string):Observable<IPaciente>{
    const medicosDocuments = this.db.doc<IPaciente>('pacientes/' + id);
    return medicosDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  agregarPaciente(user: IUser,id:string): void {
    let paciente:IPaciente = {
      name:user.name,
      surname:user.surname,
      address:user.address,
      age:user.age,
      mail:user.mail,
      password:user.password,
      first_image:user.first_image,
      second_image:user.second_image,
      type: 'Paciente'
    }
    this.db.collection<IPaciente>('pacientes').doc(id).set(paciente);
  }

  getMedicos(): Observable<IMedico[]> {
    return this.db.collection<IMedico>('medicos').valueChanges({idField: 'id'});
  }

  getMedicoById(id:string):Observable<IMedico>{
    const medicosDocuments = this.db.doc<IMedico>('medicos/' + id);
    return medicosDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  agregarMedico(user: IUser): void {
    let medico:IMedico = {
      name:user.name,
      surname:user.surname,
      address:user.address,
      age:user.age,
      mail:user.mail,
      password:user.password,
      first_image:user.first_image,
      second_image:user.second_image,
      type: 'Medico',
      validado:false,
      dias_laborables:[Dias.LUNES+'=9:00,10:00'],
      especialidades:user.especializaciones
    }
    this.db.collection<IMedico>('medicos').add(medico);
  }

}
