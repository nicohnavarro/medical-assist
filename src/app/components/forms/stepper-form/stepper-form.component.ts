import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/User';
import { Specialties } from 'src/app/utils/specialties.enum';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss'],
})
export class StepperFormComponent implements OnInit {
  @Output() usuario_registrado: EventEmitter<User> = new EventEmitter<User>();
  @Output() user_img_1: EventEmitter<File> = new EventEmitter<File>();
  @Output() user_img_2: EventEmitter<File> = new EventEmitter<File>();
  imagen_uno: string = '../../../assets/images/user.png';
  subirImagen_uno;

  obtieneImagen_uno(e) {
    this.imagen_uno = e.result;
  }
  archivoSubir_uno(e) {
    this.subirImagen_uno = e;
  }
  imagen_dos: string = '../../../assets/images/user.png';
  subirImagen_dos;

  obtieneImagen_dos(e) {
    this.imagen_dos = e.result;
  }
  archivoSubir_dos(e) {
    this.subirImagen_dos = e;
  }
  //#region  FormControls
  nombreFormCtrl: FormControl;
  apellidoFormCtrl: FormControl;
  edadFormCtrl: FormControl;
  domicilioFormCtrl: FormControl;
  documentFormCtrl: FormControl;
  emailFormCtrl: FormControl;
  claveFormCtrl: FormControl;
  obraSocial: FormControl;
  especialidadFormCtrl: FormControl;
  //#endregion

  tipoUsuario: string;
  tiposUsuarios: string[] = ['patient', 'doctor'];
  especialidades = Specialties;
  hide = true;
  cargando = false;
  usuario: User;

  datosPersonalesFormGroup: FormGroup;
  datosCuentaFormGroup: FormGroup;
  datosTipoFormGroup: FormGroup;
  constructor() {
    this.datosPersonalesFormGroup = new FormGroup({});
    this.datosTipoFormGroup = new FormGroup({});
    this.datosCuentaFormGroup = new FormGroup({});
    this.nombreFormCtrl = new FormControl('', [Validators.required]);
    this.apellidoFormCtrl = new FormControl('', [Validators.required]);
    this.edadFormCtrl = new FormControl('', [Validators.required]);
    this.domicilioFormCtrl = new FormControl('', [Validators.required]);
    this.datosPersonalesFormGroup.addControl('nombre', this.nombreFormCtrl);
    this.datosPersonalesFormGroup.addControl('apellido', this.apellidoFormCtrl);
    this.datosPersonalesFormGroup.addControl('edad', this.edadFormCtrl);
    this.datosPersonalesFormGroup.addControl(
      'domicilio',
      this.domicilioFormCtrl
    );
    this.documentFormCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]);
    this.obraSocial = new FormControl('');
    this.emailFormCtrl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.claveFormCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.datosCuentaFormGroup.addControl('email', this.emailFormCtrl);
    this.datosCuentaFormGroup.addControl('clave', this.claveFormCtrl);
    this.especialidadFormCtrl = new FormControl('');
    this.datosTipoFormGroup.addControl(
      'especialidad',
      this.especialidadFormCtrl
    );
  }

  ngOnInit(): void {}

  EnviarRegistro() {
    this.CrearUsuario();
    this.user_img_1.emit(this.subirImagen_uno);
    this.user_img_2.emit(this.subirImagen_dos);
    setTimeout(() => {
      this.usuario_registrado.emit(this.usuario);
    }, 1000);
  }

  LimpiarCampos() {
    this.datosPersonalesFormGroup.reset();
    //this.datosCuentaFormGroup.reset();
    this.claveFormCtrl.setValue('');
    this.emailFormCtrl.setValue('');
    this.datosTipoFormGroup.reset();
    this.obraSocial.setValue('');
    this.documentFormCtrl.setValue('');
    this.imagen_uno = '../../../assets/img/user.png';
    this.imagen_dos = '../../../assets/img/user.png';
    this.tipoUsuario = '';
  }

  resolved(captchaResponse: string) {
  }

  CrearUsuario() {
    this.usuario = {
      name: this.nombreFormCtrl.value,
      surname: this.apellidoFormCtrl.value,
      age: this.edadFormCtrl.value,
      mail: this.emailFormCtrl.value,
      password: this.claveFormCtrl.value,
      address: this.domicilioFormCtrl.value,
      type: this.tipoUsuario,
      doc: this.documentFormCtrl.value,
      first_image: this.imagen_uno,
      second_image: this.imagen_dos,
    };
    if (this.tipoUsuario === 'doctor')
      this.usuario.especializaciones = this.especialidadFormCtrl.value;
    if (this.tipoUsuario === 'patient')
      this.usuario.obraSocial = this.obraSocial.value;
  }
}
