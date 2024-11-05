declare type Gender = 'male' | 'female' | 'other';

declare type Status = 'pending' | 'scheduled' | 'cancelled';

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Doctor = {
  id: string;
  name: string;
  email: string;
  image: string;
};

declare type AppointmentForm = {
  patient: string;
  doctor: string;
  schedule: Date;
  reason?: string;
  notes?: string;
  status?: string;
  cancellationReason?: string;
};
declare type ScheduleAppointmentForm = {
  doctor: string;
  schedule: Date;
  reason?: string;
  notes?: string;
  status?: string;
  cancellationReason?: string;
};

declare type AppointmentCounts = {
  scheduled: number;
  pending: number;
  cancelled: number;
};

declare type AppointmentStatus = {
  scheduled: string;
  pending: string;
  cancelled: string;
};

declare interface Appointment {
  id: string;
  patient: PatientData;
  doctor: Doctor;
  schedule: Date;
  reason?: string;
  notes?: string;
  status?: string;
  cancellationReason?: string;
}

declare interface AppointmentAPIResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Appointment[];
  scheduled_count: number;
  cancelled_count: number;
  pending_count: number;
}

declare interface UserParams {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

declare interface PatientData extends UserParams {
  dateOfBirth: Date;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  primaryCarePhyician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedicaitons: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  indentificationNumber: string;
  identificationDocument: File[];
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
  password: string;
}
