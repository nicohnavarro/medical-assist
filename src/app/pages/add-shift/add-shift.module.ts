import { ComboListComponent } from './../../components/shared/combo-list/combo-list.component';
import { ComboHourComponent } from './../../components/shifts/combo-hour/combo-hour.component';
import { ComboDayComponent } from './../../components/shifts/combo-day/combo-day.component';
import { AddShiftComponent } from './add-shift.component';
import { AngularMaterialModule } from './../../modules/angular-material.module';
import { SharedModule } from './../../modules/shared.module';
import { AddShiftRoutingModule } from './add-shift.routing.module';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AddShiftComponent,ComboDayComponent,ComboHourComponent,ComboListComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AddShiftRoutingModule,
    SharedModule,
    AngularMaterialModule                                               
  ]
})
export class AddShiftModule { }
