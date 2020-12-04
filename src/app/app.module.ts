import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { PatientTestComponent } from './patient/patient-test/patient-test.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
