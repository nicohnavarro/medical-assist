import { UserModule } from './../../modules/user.module';
import { SpinnerModalComponent } from 'src/app/components/modals/spinner-modal/spinner-modal.component';
import { RegisterRoutingModule } from './register.routing.module';
import { RegisterComponent } from './register.component';
import { AngularMaterialModule } from './../../modules/angular-material.module';
import { SharedModule } from './../../modules/shared.module';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegisterComponent,SpinnerModalComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RegisterRoutingModule,
    SharedModule,
    AngularMaterialModule,
    UserModule                                          
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterModule { }
