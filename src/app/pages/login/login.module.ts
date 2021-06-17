import { AngularMaterialModule } from './../../modules/angular-material.module';
import { SharedModule } from './../../modules/shared.module';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SharedModule,
    AngularMaterialModule                                               
  ]
})
export class LoginModule { }
