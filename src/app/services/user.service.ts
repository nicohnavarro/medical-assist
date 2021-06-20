import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) { }

  
  addUser(user: IUser, id: string) {
    return this.db.collection('usuarios').doc(id).set(user);
  }
  
  udpateUser(user: IUser, id: string): Promise<void> {
    return this.db.collection<IUser>('usuarios').doc(id).set(user);
  }
  
  getAllUsers(): Observable<any[]> {
    return this.db.collection<any>('usuarios').valueChanges({ idField: 'id' });
  }

  getById(id: string): Observable<IUser> {
    const usersDocuments = this.db.doc<IUser>('usuarios/' + id);
    return usersDocuments.snapshotChanges().pipe(
      map((changes) => {
        const data = changes.payload.data();
        const id = changes.payload.id;
        return { id, ...data };
      })
    );
  }
  
  getByType(type: string) {
    return this.db
      .collection('usuarios', (ref) => ref.where('type', '==', type))
      .valueChanges({ idField: 'id' });
  }

  getCurrentUser(id: string) {
    this.getById(id).subscribe((data) => {
      return data;
    });
  }

}
