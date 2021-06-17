import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private db: AngularFirestore) {}

  getAll(): Observable<any[]> {
    return this.db.collection<any>('logs').valueChanges({ idField: 'id' });
  }

  add(log: Logs, id: string) {
    return this.db.collection('logs').doc(id).set(log);
  }

  getById(id: string): Observable<Logs> {
    const usersDocuments = this.db.doc<Logs>('logs/' + id);
    return usersDocuments.snapshotChanges().pipe(
      map((changes) => {
        const data = changes.payload.data();
        const id = changes.payload.id;
        return { id, ...data };
      })
    );
  }
}


interface Logs {
  id?:string,
  date: Date,
  user:IUser
}