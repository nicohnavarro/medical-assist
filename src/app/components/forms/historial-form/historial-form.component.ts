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
  @Output() medicalHistory: EventEmitter<any> = new EventEmitter<any>();
  historyAdded: boolean = false;
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
  moreOptions: FormGroup;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  value2 = 0;
  vertical = false;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }


  constructor(fb: FormBuilder) {
    this.moreOptions = fb.group({
      diabetes: false,
      colesterol: false,
      alergia: false
    });
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
    this.historyAdded = false;
  }

  addHistory() {
    this.buildHistory();
    this.historyAdded = true;
  }

  private buildHistory() {
    let historyAdditional = [];
    historyAdditional.push({'option':'diabetes','value':this.moreOptions.value.diabetes});
    historyAdditional.push({'option':'colesterol','value':this.moreOptions.value.colesterol});
    historyAdditional.push({'option': 'alergia','value':this.moreOptions.value.alergia});
    historyAdditional.push({'option':'dolorDeCabeza','value':this.value});
    historyAdditional.push({'option':'mareos','value':this.value2});
    if(this.option1FormCtrl.value){
      historyAdditional.push({'option':this.option1FormCtrl.value,'value':this.value1FormCtrl.value})
    }
    if(this.option2FormCtrl.value){
      historyAdditional.push({'option':this.option2FormCtrl.value,'value':this.value2FormCtrl.value})
    }
    if(this.option3FormCtrl.value){
      historyAdditional.push({'option':this.option3FormCtrl.value,'value':this.value3FormCtrl.value})
    }

    let history = {
      altura: this.heightFormCtrl.value,
      peso: this.weightFormCtrl.value,
      temperature: this.temperatureFormCtrl.value,
      pressure: this.pressureFormCtrl.value,
      diabetes: this.moreOptions.value.diabetes ? 'SI' : 'NO',
      colesterol: this.moreOptions.value.colesterol ? 'SI' : 'NO',
      alergia: this.moreOptions.value.alergia ? 'SI' : 'NO',
      historyAdditional
    };

    this.medicalHistory.emit({history,historyAdditional});
  }
}
