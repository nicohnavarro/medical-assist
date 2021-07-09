import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) { }

  
  addUser(user: User, id: string) {
    return this.db.collection('users').doc(id).set(user);
  }
  
  udpateUser(user: User, id: string): Promise<void> {
    return this.db.collection<User>('users').doc(id).set(user);
  }
  
  getAllUsers(): Observable<any[]> {
    return this.db.collection<any>('users').valueChanges({ idField: 'id' });
  }

  getById(id: string): Observable<User> {
    const usersDocuments = this.db.doc<User>('users/' + id);
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
      .collection('users', (ref) => ref.where('type', '==', type))
      .valueChanges({ idField: 'id' });
  }

  getCurrentUser(id: string) {
    this.getById(id).subscribe((data) => {
      return data;
    });
  }

}
