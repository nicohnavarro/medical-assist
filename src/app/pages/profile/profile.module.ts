import { ListHoursComponent } from '../../components/shared/medical-schedule/list-hours/list-hours.component';
import { ListDaysComponent } from '../../components/shared/medical-schedule/list-days/list-days.component';
import { UserCardComponent } from './../../components/shared/user-card/user-card.component';
import { UserModule } from './../../modules/user.module';
import { AddSpecialtyComponent } from './../../components/specialties/add-specialty/add-specialty.component';
import { MedicalScheduleComponent } from './../../components/shared/medical-schedule/medical-schedule.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from './../../modules/angular-material.module';
import { SharedModule } from './../../modules/shared.module';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ProfileComponent,MedicalScheduleComponent,AddSpecialtyComponent,UserCardComponent,ListDaysComponent,ListHoursComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule,
    AngularMaterialModule,
    UserModule                                           
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
