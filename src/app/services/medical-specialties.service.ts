import { MedicalSpecialty } from 'src/app/models/MedicalSpecialty';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalSpecialtiesService {

  constructor(private db:AngularFirestore) { }

  getSpecialties(): Observable<MedicalSpecialty[]> {
    return this.db.collection<MedicalSpecialty>('medical_specialties').valueChanges({idField: 'id'});
  }

  getSpecialtyById(id:string): Observable<MedicalSpecialty> {
    const usersDocuments = this.db.doc<MedicalSpecialty>('medical_specialties/' + id);
    return usersDocuments.valueChanges({idField: 'id'});
  }

  addSpecialty(specialty: MedicalSpecialty): void {
    this.db.collection<MedicalSpecialty>('medical_specialties').add(specialty);
  }

  updateSpecialty(specialty:MedicalSpecialty,id:string): Promise<void>{
    return this.db.collection<MedicalSpecialty>('medical_specialties').doc(id).set(specialty);
  }
}
