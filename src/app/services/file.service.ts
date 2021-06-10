import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  downloadURL: Observable<string>;

  filePath: string;
  fb;
  fileRef: AngularFireStorageReference;
  constructor(private storage: AngularFireStorage) {

  }

  async UploadFile(file: File, correo: string) {
    this.filePath = `profile_images/${correo}/${Date.now()}`;
    this.fileRef = this.storage.ref(this.filePath);
    return await this.storage.upload(this.filePath, file);
  }
}
