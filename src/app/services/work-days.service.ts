import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Shift } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class WorkDaysService {

  constructor(private db:AngularFirestore) { }

  getWorkDays(uid:string){
    // return this.db.collectionGroup('work_days').valueChanges();
    // return this.db.collection('usuarios').doc('8cZubFkLxveE2tfIq2WWIqVDK4k1').collection('work_days').valueChanges({idField: 'docId'});
        return this.db.collection('usuarios').doc(uid).collection('work_days').valueChanges({idField: 'docId'});
  }

  add(turno: Shift): void {
    this.db.collection<Shift>('turnos').add(turno);
  }

  update(turno:Shift,id:string): Promise<void>{
    return this.db.collection<Shift>('turnos').doc(id).set(turno);
  }
}
