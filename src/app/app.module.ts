import { UserModule } from './modules/user.module';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { CancelModalComponent } from './components/modals/cancel-modal/cancel-modal.component';
import { StarRatingComponent } from './components/functional/star-rating/star-rating.component';
import { RateModalComponent } from './components/modals/rate-modal/rate-modal.component';
import { SeeReviewModalComponent } from './components/modals/see-review-modal/see-review-modal.component';
import { SurveyModalComponent } from './components/modals/survey-modal/survey-modal.component';
import { SurveyFieldComponent } from './components/shared/survey-field/survey-field.component';
import { HistorialFormComponent } from './components/forms/historial-form/historial-form.component';
import { SetReviewModalComponent } from './components/modals/set-review-modal/set-review-modal.component';
import { ListComponent } from './pages/list/list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
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
import { ErrorComponent } from './pages/error/error.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { HourTakenDirective } from './directives/hour-taken.directive';
import { PatientHistoryComponent } from './pages/patient-history/patient-history.component';
import { PatientsComponent } from './pages/patients/patients.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SurveyFieldComponent,
    SurveyModalComponent,
    SeeReviewModalComponent,
    RateModalComponent,
    StarRatingComponent,
    CancelModalComponent,
    ConfirmModalComponent,
    PatientListComponent,
    DoctorListComponent,
    HistorialFormComponent,
    ListComponent,
    SetReviewModalComponent,
    HourTakenDirective,
    PatientHistoryComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserModule,
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
    AngularFireStorageModule
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
