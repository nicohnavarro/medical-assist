import { ThemeService } from './theme/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2 ,private themeService:ThemeService) {
  }

  onSelectedTheme(checked) {
    const hostClass = checked ? 'mat-app-background darkMode' : 'mat-app-background lightMode';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
    this.toggle()
  }
  private toggle() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
