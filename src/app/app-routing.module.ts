import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientListComponent} from './patient/patient-list/patient-list.component';

const routes: Routes = [{path: 'patient-list', component: PatientListComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
