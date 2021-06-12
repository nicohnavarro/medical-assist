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

  getAll():Observable<any[]> {
    return this.db.collection<IAdmin>('usuarios').valueChanges({idField: 'docId'});
  }

  add(user:IUser,id:string){
    return this.db.collection('usuarios').doc(id).set(user);
  }

  getById(id:string):Observable<IUser>{
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
    this.getById(id).subscribe((data)=>{
      return data;
    });
  }

  getByType(type:string) {
    return this.db.collection('usuarios', ref => ref.where('type', '==', type)).valueChanges({idField: 'uid'});
  }

}
