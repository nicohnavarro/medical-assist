import { RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './shared.module';
import { StepperFormComponent } from './../components/forms/stepper-form/stepper-form.component';
import { UserDetailComponent } from './../components/shared/user-detail/user-detail.component';
import { UploadImageComponent } from './../components/functional/upload-image/upload-image.component';

import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    UploadImageComponent,
    UserDetailComponent,
    StepperFormComponent,
  ],
  imports: [
    SharedModule,
    TranslateModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  exports: [UploadImageComponent, UserDetailComponent, StepperFormComponent],
})
export class UserModule {}
