export interface Appointment
{
  PK_AppointmentId: number;
  AppointmentDateTime: Date;
  DurationInMin: number;
  Description: string;
  FK_PatientCPR: string;
  FK_DoctorId: number;
}
