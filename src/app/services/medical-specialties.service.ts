import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalSpecialtiesService {

  constructor(private db:AngularFirestore) { }

  getSpecialties(): Observable<any[]> {
    return this.db.collection<any>('medical_specialties').valueChanges({idField: 'id'});
  }

  getSpecialtyById(id:string): Observable<any> {
    const usersDocuments = this.db.doc<any>('medical_specialties/' + id);
    return usersDocuments.valueChanges({idField: 'id'});
  }

  addSpecialty(specialty: string): void {
    this.db.collection<string>('medical_specialties').add(specialty);
  }
}
