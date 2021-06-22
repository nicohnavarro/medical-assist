import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) , data: { animation: 'home' } },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: { animation: 'login' } },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) , data: { animation: 'register' } },
  { path: '**', component: ErrorComponent, data: { animation: 'home' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
