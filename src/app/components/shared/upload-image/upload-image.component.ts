import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() source: string;
  @Output() fotoSeleccionada = new EventEmitter<any>();
  @Output() fotoSubir = new EventEmitter<any>();
  fileToUpload: File = null;
  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(e,source) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.fotoSubir.emit(e.target.files[0]);
      reader.onload = (event: any) => {
        this.fotoSeleccionada.emit(event.target);
      }
    }
   
  }
}
