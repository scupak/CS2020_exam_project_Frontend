import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

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
    PatientUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
