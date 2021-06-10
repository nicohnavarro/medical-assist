import { darkTheme } from './theme/dark-theme';
import { lightTheme } from './theme/light-theme';
import { ThemeModule } from './theme/theme.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LanguageSelectorComponent } from './components/shared/language-selector/language-selector.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UploadImageComponent } from './components/shared/upload-image/upload-image.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { StepperFormComponent } from './components/shared/stepper-form/stepper-form.component';
import { UserDetailComponent } from './components/shared/user-detail/user-detail.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SpinnerModalComponent } from './components/shared/spinner-modal/spinner-modal.component';
import { ListadoPacientesComponent } from './components/pacientes/listado-pacientes/listado-pacientes.component';
import { ListadoProfesionalesComponent } from './components/profesionales/listado-profesionales/listado-profesionales.component';
import { DetalleProfesionalComponent } from './components/profesionales/detalle-profesional/detalle-profesional.component';
import { DetallePacienteComponent } from './components/pacientes/detalle-paciente/detalle-paciente.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ListadoTurnosComponent } from './components/turnos/listado-turnos/listado-turnos.component';
import { SacarTurnoComponent } from './pages/sacar-turno/sacar-turno.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EnumAsStringPipe } from './pipes/enum-as-string.pipe';
import { ComboProfesionalComponent } from './components/profesionales/combo-profesional/combo-profesional.component';
import { ComboEspecialidadComponent } from './components/especialidades/combo-especialidad/combo-especialidad.component';
import { AltaEspecialidadComponent } from './components/especialidades/alta-especialidad/alta-especialidad.component';
import { ComboDiaComponent } from './components/turnos/combo-dia/combo-dia.component';
import { ComboHoraComponent } from './components/turnos/combo-hora/combo-hora.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { ReseniaModalComponent } from './components/shared/resenia-modal/resenia-modal.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ThemeToogleComponent } from './components/shared/theme-toogle/theme-toogle.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    NavbarComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
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
    InfoHomeComponent,
    EncuestaComponent,
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
    PerfilComponent,
    MisTurnosComponent,
    ReseniaModalComponent,
    ThemeToogleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
