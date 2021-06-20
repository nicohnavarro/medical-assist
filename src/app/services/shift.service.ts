import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Shift } from '../models/Shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private db:AngularFirestore) { }

  getShifts(): Observable<Shift[]> {
    return this.db.collection<Shift>('shifts').valueChanges({idField: 'id'});
  }

  addShift(shift: Shift): void {
    this.db.collection<Shift>('shifts').add(shift);
  }

  updateShift(shift:Shift,id:string): Promise<void>{
    return this.db.collection<Shift>('shifts').doc(id).set(shift);
  }
}
