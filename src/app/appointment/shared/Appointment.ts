import {Doctor} from '../../doctor/shared/doctor.model';
import {Patient} from '../../patient/shared/Patient';

export interface Appointment
{
  appointmentId: number;
  appointmentDateTime: Date;
  durationInMin: number;
  description: string;
  patientCpr: string;
  doctorEmailAddress: number;
  doctor: Doctor;
  patient: Patient;

}
