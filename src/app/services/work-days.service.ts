import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorkDaysService {

  constructor(private db: AngularFirestore) { }

  getWorkDays(uid: string) {
    // return this.db.collectionGroup('work_days').valueChanges();
    // return this.db.collection('usuarios').doc('8cZubFkLxveE2tfIq2WWIqVDK4k1').collection('work_days').valueChanges({idField: 'docId'});
    return this.db.collection('usuarios').doc(uid).collection('work_days').valueChanges({ idField: 'docId' });
  }

  addWorkDays(workDays: any): void {
    this.db.collection<any>('workDays').add(workDays);
  }

  updateWorkDays(workDays: any, id: string): Promise<void> {
    return this.db.collection<any>('workDays').doc(id).set(workDays);
  }
}
