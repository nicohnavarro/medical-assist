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
import { FooterComponent } from './components/shared/footer/footer.component';
import { StepperFormComponent } from './components/forms/stepper-form/stepper-form.component';
import { UserDetailComponent } from './components/shared/user-detail/user-detail.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SpinnerModalComponent } from './components/modals/spinner-modal/spinner-modal.component';
import { ListadoPacientesComponent } from './components/pacientes/listado-pacientes/listado-pacientes.component';
import { ListadoProfesionalesComponent } from './components/doctor/doctor-list/doctor-list.component';
import { DetalleProfesionalComponent } from './components/doctor/detalle-profesional/detalle-profesional.component';
import { DetallePacienteComponent } from './components/pacientes/detalle-paciente/detalle-paciente.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { SurveyFieldComponent } from './components/survey-field/survey-field.component';
import { ListadoTurnosComponent } from './components/turnos/listado-turnos/listado-turnos.component';
import { SacarTurnoComponent } from './pages/sacar-turno/sacar-turno.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EnumAsStringPipe } from './pipes/enum-as-string.pipe';
import { ComboProfesionalComponent } from './components/doctor/doctor-combo/doctor-combo.component';
import { ComboEspecialidadComponent } from './components/especialidades/combo-especialidad/combo-especialidad.component';
import { AltaEspecialidadComponent } from './components/especialidades/alta-especialidad/alta-especialidad.component';
import { ComboDiaComponent } from './components/turnos/combo-dia/combo-dia.component';
import { ComboHoraComponent } from './components/turnos/combo-hora/combo-hora.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
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
    ListadoPacientesComponent,
    ListadoProfesionalesComponent,
    DetalleProfesionalComponent,
    DetallePacienteComponent,
    ListadosComponent,
    SidebarComponent,
    SurveyFieldComponent,
    ListadoTurnosComponent,
    SacarTurnoComponent,
    EnumToArrayPipe,
    EnumAsStringPipe,
    ComboProfesionalComponent,
    ComboEspecialidadComponent,
    AltaEspecialidadComponent,
    ComboDiaComponent,
    ComboHoraComponent,
    ConfirmModalComponent,
    ProfileComponent,
    MisTurnosComponent,
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
