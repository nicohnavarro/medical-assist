import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { PatientHistory } from '../models/PatientHistory';

@Injectable({
  providedIn: 'root'
})
export class PatientHistoryService {

  constructor(private db:AngularFirestore) { }

  getPatientHistories(): Observable<PatientHistory[]> {
    return this.db.collection<PatientHistory>('patient_history').valueChanges({idField: 'id'});
  }

  addPatientHistory(patient_history: PatientHistory): void {
    this.db.collection<PatientHistory>('patient_history').add(patient_history);
  }

  updatePatientHistory(patient_history:PatientHistory,id:string): Promise<void>{
    return this.db.collection<PatientHistory>('patient_history').doc(id).set(patient_history);
  }
}
