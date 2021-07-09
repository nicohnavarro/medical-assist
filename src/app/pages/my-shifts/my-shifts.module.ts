import { EnumToArrayPipe } from './../../pipes/enum-to-array.pipe';
import { EnumAsStringPipe } from './../../pipes/enum-as-string.pipe';
import { CustomFilterComponent } from './../../components/shared/custom-filter/custom-filter.component';
import { ShiftsListComponent } from './../../components/shifts/shifts-list/shifts-list.component';
import { MyShiftsComponent } from './my-shifts.component';
import { MyShiftsRoutingModule } from './my-shifts.routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { SharedModule } from '../../modules/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MyShiftsComponent,
    ShiftsListComponent,
    CustomFilterComponent,
    EnumAsStringPipe,
  ],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MyShiftsRoutingModule,
    SharedModule,
    AngularMaterialModule,
  ],
})
export class MyShiftsModule {}
