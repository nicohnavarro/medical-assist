import { AngularMaterialModule } from './angular-material.module';
import { ThemeToogleComponent } from './../components/shared/theme-toogle/theme-toogle.component';
import { LanguageSelectorComponent } from './../components/shared/language-selector/language-selector.component';
import { ThemeModule } from './../theme/theme.module';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [LanguageSelectorComponent, ThemeToogleComponent],
  imports: [AngularMaterialModule

  ],
  exports: [
    LanguageSelectorComponent,
    ThemeToogleComponent,
    AngularMaterialModule
  ]
})
export class SharedModule { }