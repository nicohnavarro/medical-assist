import { SurveyFieldComponent } from './../../components/shared/survey-field/survey-field.component';
import { SurveyModalComponent } from './../../components/modals/survey-modal/survey-modal.component';
import { HistorialFormComponent } from './../../components/forms/historial-form/historial-form.component';
import { CustomFilterComponent } from './../../components/shared/custom-filter/custom-filter.component';
import { ShiftsListComponent } from './../../components/shifts/shifts-list/shifts-list.component';
import { MyShiftsComponent } from './my-shifts.component';
import { MyShiftsRoutingModule } from './my-shifts.routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { SharedModule } from '../../modules/shared.module';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MyShiftsComponent,ShiftsListComponent,CustomFilterComponent,HistorialFormComponent,SurveyFieldComponent,SurveyModalComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MyShiftsRoutingModule,
    SharedModule,
    AngularMaterialModule                                               
  ]
})
export class MyShiftsModule { }
