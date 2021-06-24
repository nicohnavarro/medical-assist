import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private db: AngularFirestore) {}

  getAllUsers(): Observable<any[]> {
    return this.db.collection<any>('logs').valueChanges({ idField: 'id' });
  }

  add(log: Logs) {
    return this.db.collection('logs').add(log);
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
  userId:string
}