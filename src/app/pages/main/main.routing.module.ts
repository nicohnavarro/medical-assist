import { ListComponent } from './../list/list.component';
import { ProfileComponent } from './../profile/profile.component';
import { InfoHomeComponent } from './../../components/shared/info-home/info-home.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: MainComponent,children:[
      { path: 'home', component: InfoHomeComponent },
      { path: 'profile',  loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
      { path: 'lists', component: ListComponent },
      { path: 'addShift', loadChildren: () => import('../add-shift/add-shift.module').then(m => m.AddShiftModule) },
      { path: 'myShifts',  loadChildren: () => import('../my-shifts/my-shifts.module').then(m => m.MyShiftsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }