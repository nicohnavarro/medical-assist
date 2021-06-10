import { ThemeService } from './../../../theme/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-toogle',
  templateUrl: './theme-toogle.component.html',
  styleUrls: ['./theme-toogle.component.scss']
})
export class ThemeToogleComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2 ,private themeService:ThemeService) { }

  ngOnInit(): void {

    
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
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
