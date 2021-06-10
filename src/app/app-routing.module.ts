import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SacarTurnoComponent } from './pages/sacar-turno/sacar-turno.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: HomeComponent, data: {animation: 'home'},children:[
    {path: 'home',component:InfoHomeComponent,data: {animation: 'home'}},
    {path: 'perfil',component:PerfilComponent,data: {animation: 'home'}},
    {path: 'listados', component:ListadosComponent},
    {path: 'sacar-turno', component:SacarTurnoComponent},
    {path: 'mis-turnos', component:MisTurnosComponent},
    {path: 'encuesta', component:EncuestaComponent},
  ]},
  { path: 'login', component: LoginComponent, data: {animation: 'login'} },
  { path: 'register', component: RegisterComponent, data: {animation: 'registro'} },
  { path: '**', component: HomeComponent, data: {animation: 'home'} }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
