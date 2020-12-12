import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { DoctorDetailComponent } from './doctor/doctor-detail/doctor-detail.component';
import { DoctorCreateComponent } from './doctor/doctor-create/doctor-create.component';
import { DoctorUpdateComponent } from './doctor/doctor-update/doctor-update.component';
import { PatientCreatorComponent } from './patient/patient-creator/patient-creator.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { PatientUpdateComponent } from './patient/patient-update/patient-update.component';
import { AppointmentDetailComponent } from './appointment/appointment-detail/appointment-detail.component';
import { AppointmentCreatorComponent } from './appointment/appointment-creator/appointment-creator.component';
import {DatePipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentUpdateComponent } from './appointment/appointment-update/appointment-update.component';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeScreenComponent,
    DoctorListComponent,
    PatientListComponent,
    AppointmentListComponent,
    DoctorDetailComponent,
    DoctorCreateComponent,
    DoctorUpdateComponent,
    PatientCreatorComponent,
    PatientDetailComponent,
    PatientUpdateComponent,
    AppointmentDetailComponent,
    AppointmentCreatorComponent,
    AppointmentUpdateComponent,
    LoginScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
