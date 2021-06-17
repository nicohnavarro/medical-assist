import { UserGuard } from './guards/user.guard';
import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SacarTurnoComponent } from './pages/sacar-turno/sacar-turno.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent, data: {animation: 'home'},children:[
    {path: '',component:InfoHomeComponent},
    {path: 'home',component:InfoHomeComponent},
    {path: 'profile',component:ProfileComponent,data: {animation: 'home'}},
    {path: 'lists', component:ListadosComponent},
    {path: 'addShift', component:SacarTurnoComponent},
    {path: 'shiftsList', component:MisTurnosComponent},
    // {path: 'surveys', component:EncuestaComponent, canActivate:[UserGuard]},
  ]},
  { path: 'login',  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: {animation: 'login'} },
  { path: 'register', component: RegisterComponent, data: {animation: 'register'} },
  { path: '**', component: ErrorComponent, data: {animation: 'home'} }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
