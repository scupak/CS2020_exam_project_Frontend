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
import {LoginScreenComponent} from './login/login-screen/login-screen.component';
import {LoginGuard} from './shared/authentication/_guards/Login.guard';
import {DoctorGuard} from './shared/authentication/_guards/doctor.guard';
import {AdminGuard} from './shared/authentication/_guards/admin.guard';
import {AppointmentCalendarComponent} from './appointment/appointment-calendar/appointment-calendar.component';
//AdminGuard, LoginGuard, DoctorGuard - Operators form the canActivate command..
const routes: Routes = [
  { path: 'home', component: HomeScreenComponent},
  { path: 'login', component: LoginScreenComponent },
  { path: 'doctor-list', component: DoctorListComponent , canActivate: [LoginGuard]},
  { path: 'doctor-detail/:id', component: DoctorDetailComponent , canActivate: [LoginGuard]},
  {path: 'doctor-create', component: DoctorCreateComponent , canActivate: [LoginGuard, AdminGuard]},
  {path: 'doctor-update/:id', component: DoctorUpdateComponent , canActivate: [LoginGuard]},
  { path: 'patient-list', component: PatientListComponent , canActivate: [LoginGuard, DoctorGuard]},
  { path: 'patient-creator', component: PatientCreatorComponent , canActivate: [LoginGuard, DoctorGuard]},
  { path: 'patient-detail/:id', component: PatientDetailComponent , canActivate: [LoginGuard]},
  { path: 'patient-update/:id', component: PatientUpdateComponent , canActivate: [LoginGuard]},
  { path: 'appointment-list', component: AppointmentListComponent , canActivate: [LoginGuard]},
  { path: 'appointment-detail/:id/:return', component: AppointmentDetailComponent , canActivate: [LoginGuard]},
  { path: 'appointment-creator', component: AppointmentCreatorComponent , canActivate: [LoginGuard]},
  { path: 'appointment-update/:id/:return', component: AppointmentUpdateComponent , canActivate: [LoginGuard]},
  { path: 'appointment-calendar', component: AppointmentCalendarComponent, canActivate: [LoginGuard, DoctorGuard]},
  { path: 'appointment-calendar/:id', component: AppointmentCalendarComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
