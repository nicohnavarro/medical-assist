import { ColorStateDirective } from './../directives/color-state.directive';
import { AngularMaterialModule } from './angular-material.module';
import { ThemeToogleComponent } from '../components/functional/theme-toogle/theme-toogle.component';
import { LanguageSelectorComponent } from '../components/functional/language-selector/language-selector.component';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [LanguageSelectorComponent, ThemeToogleComponent,ColorStateDirective],
  imports: [AngularMaterialModule,NgxChartsModule],
  exports: [
    LanguageSelectorComponent,
    ThemeToogleComponent,
    AngularMaterialModule,
    NgxChartsModule,
    ColorStateDirective,
  ]
})
export class SharedModule { }