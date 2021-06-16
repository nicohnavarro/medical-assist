import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-historial-form',
  templateUrl: './historial-form.component.html',
  styleUrls: ['./historial-form.component.scss'],
})
export class HistorialFormComponent implements OnInit {
  @Output() datosFijos: EventEmitter<any> = new EventEmitter<any>();
  //#region  FormControls
  heightFormCtrl: FormControl;
  weightFormCtrl: FormControl;
  temperatureFormCtrl: FormControl;
  pressureFormCtrl: FormControl;
  option1FormCtrl: FormControl;
  value1FormCtrl: FormControl;
  option2FormCtrl: FormControl;
  value2FormCtrl: FormControl;
  option3FormCtrl: FormControl;
  value3FormCtrl: FormControl;
  //#endregion
  datosHistorialFormGroup: FormGroup;

  constructor() {
    this.datosHistorialFormGroup = new FormGroup({});
    this.heightFormCtrl = new FormControl('', [Validators.required]);
    this.weightFormCtrl = new FormControl('', [Validators.required]);
    this.temperatureFormCtrl = new FormControl('', [Validators.required]);
    this.pressureFormCtrl = new FormControl('', [Validators.required]);

    this.datosHistorialFormGroup.addControl('height', this.heightFormCtrl);
    this.datosHistorialFormGroup.addControl('weight', this.weightFormCtrl);
    this.datosHistorialFormGroup.addControl(
      'temperature',
      this.temperatureFormCtrl
    );
    this.datosHistorialFormGroup.addControl('pressure', this.pressureFormCtrl);
    this.option1FormCtrl = new FormControl('');
    this.value1FormCtrl = new FormControl('');
    this.option2FormCtrl = new FormControl('');
    this.value2FormCtrl = new FormControl('');
    this.option3FormCtrl = new FormControl('');
    this.value3FormCtrl = new FormControl('');
  }

  ngOnInit(): void {}
  cleanAll() {
    this.datosHistorialFormGroup.reset();
  }

  addHistory() {}

  private buildHistory() {}
}
