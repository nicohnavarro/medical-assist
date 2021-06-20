import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListComponent } from './pages/list/list.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main', component: MainComponent, data: { animation: 'home' }, children: [
      { path: '', component: InfoHomeComponent },
      { path: 'home', component: InfoHomeComponent },
      { path: 'profile', component: ProfileComponent, data: { animation: 'home' } },
      { path: 'lists', component: ListComponent },
      { path: 'addShift', loadChildren: () => import('./pages/add-shift/add-shift.module').then(m => m.AddShiftModule), data: { animation: 'login' } },
      { path: 'myShifts',  loadChildren: () => import('./pages/my-shifts/my-shifts.module').then(m => m.MyShiftsModule), data: { animation: 'login' } },
      // {path: 'surveys', component:EncuestaComponent, canActivate:[UserGuard]},
    ]
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: { animation: 'login' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'register' } },
  { path: '**', component: ErrorComponent, data: { animation: 'home' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
