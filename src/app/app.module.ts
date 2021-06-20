import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { MyShiftsComponent } from './pages/my-shifts/my-shifts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ComboHourComponent } from './components/shifts/combo-hour/combo-hour.component';
import { ComboDayComponent } from './components/shifts/combo-day/combo-day.component';
import { AddSpecialtyComponent } from './components/specialties/add-specialty/add-specialty.component';
import { ComboSpecialtiesComponent } from './components/specialties/combo-specialties/combo-specialties.component';
import { DoctorComboComponent } from './components/doctor/doctor-combo/doctor-combo.component';
import { AddShiftComponent } from './pages/add-shift/add-shift.component';
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
import { DoctorListComponent } from './components/doctor/doctor-list/doctor-list.component';
import { SurveyFieldComponent } from './components/shared/survey-field/survey-field.component';
import { ShiftsListComponent } from './components/shifts/shifts-list/shifts-list.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EnumAsStringPipe } from './pipes/enum-as-string.pipe';
import { ReseniaModalComponent } from './components/modals/resenia-modal/resenia-modal.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { ComboListComponent } from './components/shared/combo-list/combo-list.component';
import { CustomFilterComponent } from './components/shared/custom-filter/custom-filter.component';
import { CancelModalComponent } from './components/modals/cancel-modal/cancel-modal.component';
import { ReviewModalComponent } from './components/modals/review-modal/review-modal.component';
import { HistorialFormComponent } from './components/forms/historial-form/historial-form.component';
import { StarRatingComponent } from './components/functional/star-rating/star-rating.component';
import { RateModalComponent } from './components/modals/rate-modal/rate-modal.component';
import { SurveyModalComponent } from './components/modals/survey-modal/survey-modal.component';
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
    SurveyFieldComponent,
    ShiftsListComponent,
    AddShiftComponent,
    EnumToArrayPipe,
    EnumAsStringPipe,
    DoctorComboComponent,
    ComboSpecialtiesComponent,
    AddSpecialtyComponent,
    ComboDayComponent,
    ComboHourComponent,
    ConfirmModalComponent,
    ProfileComponent,
    MyShiftsComponent,
    ReseniaModalComponent,
    InfoHomeComponent,
    ComboListComponent,
    CustomFilterComponent,
    CancelModalComponent,
    ReviewModalComponent,
    HistorialFormComponent,
    StarRatingComponent,
    RateModalComponent,
    SurveyModalComponent,
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
