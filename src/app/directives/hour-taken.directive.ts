import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHourTaken]'
})
export class HourTakenDirective {

  constructor(el: ElementRef) { 
    el.nativeElement
  }

}
