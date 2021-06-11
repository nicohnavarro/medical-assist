import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SacarTurnoComponent } from './pages/sacar-turno/sacar-turno.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent, data: {animation: 'home'},children:[
    {path: '',component:InfoHomeComponent},
    {path: 'perfil',component:PerfilComponent,data: {animation: 'home'}},
    {path: 'listados', component:ListadosComponent},
    {path: 'sacar-turno', component:SacarTurnoComponent},
    {path: 'mis-turnos', component:MisTurnosComponent},
    {path: 'encuesta', component:EncuestaComponent},
  ]},
  { path: 'login', component: LoginComponent, data: {animation: 'login'} },
  { path: 'register', component: RegisterComponent, data: {animation: 'registro'} },
  { path: '**', component: ErrorComponent, data: {animation: 'home'} }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
