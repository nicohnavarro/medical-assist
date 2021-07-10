import { ShiftStates } from './../utils/shiftStates.enum';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorState]'
})
export class ColorStateDirective {

  constructor(el: ElementRef) {
    setTimeout(() => {
      const styles = this.setColor(el.nativeElement.innerText);
      el.nativeElement.style.backgroundColor = styles.background;
      el.nativeElement.style.color = styles.color;
      el.nativeElement.innerText = styles.text;
    }, 500);
  }

  setColor(state: string): styleState {
    switch (state) {
      case ShiftStates[0]:
        return { background: 'grey', color: 'black', text: '🕒 Pendiente' }
        break;
      case ShiftStates[1]:
        return { background: 'green', color: 'white', text: '✅ Aceptado' }
        break;
      case ShiftStates[2]:
        return { background: 'orange', color: 'black', text: '❌ Cancelado por Doctor' }
        break;
      case ShiftStates[3]:
        return { background: 'orange', color: 'black', text: '❎ Cancelado por ti' }
        break;
      case ShiftStates[4]:
        return { background: 'orange', color: 'black', text: '👨‍⚕️ Rechazado' }
        break;
      case ShiftStates[5]:
        return { background: 'blue', color: 'white', text: '☑️ Finalizado' }
        break;
      default:
        break;
    }
  }
}

export type styleState = {
  background: string,
  color: string,
  text: string,
}