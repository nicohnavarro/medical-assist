import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() selectedTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.selectedTheme.emit(checked);
  }

  prueba() {
    const notyf = new Notyf({
      types: [
        {
          type: 'info',
          background: 'blue',
          icon: false
        }
      ]
    });
    
    notyf.open({
      type: 'info',
      message: 'Send us <b>an email</b> to get support'
    });
  }

}
