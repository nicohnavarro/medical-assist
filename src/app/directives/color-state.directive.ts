import { ShiftStates } from './../utils/shiftStates.enum';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appColorState]'
})
export class ColorStateDirective implements OnChanges {

  constructor(private el: ElementRef) {
  }

  @Input() appColorState: number;

  setColor(appColorStateate: number): styleState {
    const state = ShiftStates[appColorStateate];
    switch (state) {
      case ShiftStates[0]:
        return { background: 'grey', color: 'black', text: '🕒 Pendiente' }
      case ShiftStates[1]:
        return { background: 'green', color: 'white', text: '✅ Aceptado' }
      case ShiftStates[2]:
        return { background: 'orange', color: 'black', text: '❌ Cancelado por Doctor' }
      case ShiftStates[3]:
        return { background: 'orange', color: 'black', text: '❎ Cancelado por Paciente' }
      case ShiftStates[4]:
        return { background: 'orange', color: 'black', text: '👨‍⚕️ Rechazado' }
      case ShiftStates[5]:
        return { background: 'blue', color: 'white', text: '☑️ Finalizado' }
      default:
        return { background: 'black', color: 'white', text: '⏳' }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appColorState) {
      const styles = this.setColor(this.appColorState);
      this.el.nativeElement.style.backgroundColor = styles.background;
      this.el.nativeElement.style.color = styles.color;
      this.el.nativeElement.innerText = styles.text;
    }
  }
}

export type styleState = {
  background: string,
  color: string,
  text: string,
}