import { ThemeService } from './../../theme/theme.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario; 
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
  ngOnInit(): void {
  }

}
