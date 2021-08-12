import { PatientsComponent } from './../patients/patients.component';
import { PatientHistoryComponent } from './../patient-history/patient-history.component';
import { ListComponent } from './../list/list.component';
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
      { path: 'patients', component: PatientsComponent },
      { path: 'addShift', loadChildren: () => import('../add-shift/add-shift.module').then(m => m.AddShiftModule) },
      { path: 'myShifts',  loadChildren: () => import('../my-shifts/my-shifts.module').then(m => m.MyShiftsModule) },
      { path: 'history',  component:PatientHistoryComponent},
      { path: 'statistics',  loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }