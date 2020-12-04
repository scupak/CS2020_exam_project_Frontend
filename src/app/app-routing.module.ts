import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientListComponent} from './patient/patient-list/patient-list.component';
import {PatientTestComponent} from './patient/patient-test/patient-test.component';

const routes: Routes = [{path: 'patient-list', component: PatientListComponent } ,
                        {path: 'patienttest', component: PatientTestComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
