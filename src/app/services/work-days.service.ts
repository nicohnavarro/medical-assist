import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { WorkDay } from '../models/WorkDay';

@Injectable({
  providedIn: 'root'
})
export class WorkDaysService {

  constructor(private db: AngularFirestore) { }

  getWorkDays(uid: string) {
    // return this.db.collectionGroup('workDays').valueChanges();
    // return this.db.collection('users').doc('8cZubFkLxveE2tfIq2WWIqVDK4k1').collection('workDays').valueChanges({idField: 'docId'});
    return this.db.collection('users').doc(uid).collection<WorkDay>('workDays').valueChanges({ idField: 'docId' });
  }

  addWorkDays(workDays: any,uid:string): Promise<DocumentReference> {
    this.db.collection<any>('workDays').add(workDays);
    return this.db.collection('users').doc(uid).collection('workDays').add(workDays);
  }

  updateWorkDays(workDays: any,idUser:string ,uid: string): Promise<void> {
    return this.db.collection('users').doc(idUser).collection<WorkDay>('workDays').doc(uid).set(workDays);
  }
}
