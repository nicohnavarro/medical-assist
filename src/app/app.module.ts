import { ProfileComponent } from './pages/profile/profile.component';
import { AddSpecialtyComponent } from './components/specialties/add-specialty/add-specialty.component';
import { ListComponent } from './pages/list/list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SharedModule } from './modules/shared.module';
import { darkTheme } from './theme/dark-theme';
import { lightTheme } from './theme/light-theme';
import { ThemeModule } from './theme/theme.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { ErrorComponent } from './pages/error/error.component';
import { RegisterComponent } from './pages/register/register.component';
import { UploadImageComponent } from './components/functional/upload-image/upload-image.component';
import { StepperFormComponent } from './components/forms/stepper-form/stepper-form.component';
import { UserDetailComponent } from './components/shared/user-detail/user-detail.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SpinnerModalComponent } from './components/modals/spinner-modal/spinner-modal.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EnumAsStringPipe } from './pipes/enum-as-string.pipe';
import { SeeReviewModalComponent } from './components/modals/see-review-modal/see-review-modal.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { MedicalScheduleComponent } from './components/shared/medical-schedule/medical-schedule.component';
import { HourTakenDirective } from './directives/hour-taken.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    ErrorComponent,
    RegisterComponent,
    UploadImageComponent,
    FooterComponent,
    StepperFormComponent,
    UserDetailComponent,
    SpinnerModalComponent,
    PatientListComponent,
    DoctorListComponent,
    ListComponent,
    EnumToArrayPipe,
    EnumAsStringPipe,
    AddSpecialtyComponent,
    ProfileComponent,
    SeeReviewModalComponent,
    InfoHomeComponent,
    MedicalScheduleComponent,
    HourTakenDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RecaptchaModule
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
