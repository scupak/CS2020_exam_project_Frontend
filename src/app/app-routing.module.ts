import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { DoctorDetailComponent } from './doctor/doctor-detail/doctor-detail.component';
import {DoctorCreateComponent} from './doctor/doctor-create/doctor-create.component';
import {PatientCreatorComponent} from './patient/patient-creator/patient-creator.component';
import {PatientDetailComponent} from './patient/patient-detail/patient-detail.component';
import {PatientUpdateComponent} from './patient/patient-update/patient-update.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent},
  { path: 'doctor-list', component: DoctorListComponent},
  { path: 'doctor-detail/:id', component: DoctorDetailComponent},
  {path: 'doctor-create', component: DoctorCreateComponent},
  { path: 'patient-list', component: PatientListComponent},
  { path: 'appointment-list', component: AppointmentListComponent},
  { path: 'patient-creator', component: PatientCreatorComponent},
  { path: 'patient-detail/:id', component: PatientDetailComponent},
  { path: 'patient-update/:id', component: PatientUpdateComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
