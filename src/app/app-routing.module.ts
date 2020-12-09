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
import {DoctorUpdateComponent} from './doctor/doctor-update/doctor-update.component';
import {AppointmentDetailComponent} from './appointment/appointment-detail/appointment-detail.component';
import {AppointmentCreatorComponent} from './appointment/appointment-creator/appointment-creator.component';
import {AppointmentUpdateComponent} from './appointment/appointment-update/appointment-update.component';

const routes: Routes = [
  { path: 'home', component: HomeScreenComponent},
  { path: 'doctor-list', component: DoctorListComponent},
  { path: 'doctor-detail/:id', component: DoctorDetailComponent},
  {path: 'doctor-create', component: DoctorCreateComponent},
  {path: 'doctor-update/:id', component: DoctorUpdateComponent},
  { path: 'patient-list', component: PatientListComponent},
  { path: 'patient-creator', component: PatientCreatorComponent},
  { path: 'patient-detail/:id', component: PatientDetailComponent},
  { path: 'patient-update/:id', component: PatientUpdateComponent},
  { path: 'appointment-list', component: AppointmentListComponent},
  { path: 'appointment-detail/:id', component: AppointmentDetailComponent},
  { path: 'appointment-creator', component: AppointmentCreatorComponent},
  { path: 'appointment-update/:id', component: AppointmentUpdateComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
