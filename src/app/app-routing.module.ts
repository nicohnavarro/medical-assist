import { UserGuard } from './guards/user.guard';
import { InfoHomeComponent } from './components/shared/info-home/info-home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListComponent } from './pages/list/list.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyShiftsComponent } from './pages/my-shifts/my-shifts.component';
import { AddShiftComponent } from './pages/add-shift/add-shift.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main', component: MainComponent, data: { animation: 'home' }, children: [
      { path: '', component: InfoHomeComponent },
      { path: 'home', component: InfoHomeComponent },
      { path: 'profile', component: ProfileComponent, data: { animation: 'home' } },
      { path: 'lists', component: ListComponent },
      { path: 'addShift', component: AddShiftComponent },
      { path: 'shiftsList', component: MyShiftsComponent },
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
