import { ThemeService } from './../../../theme/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-theme-toogle',
  templateUrl: './theme-toogle.component.html',
  styleUrls: ['./theme-toogle.component.scss']
})
export class ThemeToogleComponent implements OnInit {
  checked:boolean;
  themeState:string;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2 ,private overlayContainer:OverlayContainer,private themeService:ThemeService) {
    this.checked = this.themeService.getActiveTheme().name === 'light' ? false : true; 
    this.validatetheme();
    this.renderer.setAttribute(this.document.body, 'class',this.themeState);
   }

  ngOnInit(): void {
  }

  validatetheme(){
    this.checked ? this.themeState='mat-app-background darkMode' : this.themeState='mat-app-background lightMode';
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    const hostClass = checked ? 'mat-app-background darkMode' : 'mat-app-background lightMode';
    const theme = checked ? 'dark' : 'light';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
    const classes = this.overlayContainer.getContainerElement().classList;
    console.log(this.overlayContainer.getContainerElement().children);
    if(checked){
      classes.remove('lightMode');
      classes.add('darkMode');
    }
    else{
      classes.remove('darkMode');
      classes.add('lightMode');
    }
    this.themeService.setTheme(theme);
  }
}
