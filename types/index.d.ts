declare type Gender = 'male' | 'female' | 'other';

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

declare type Appointment = {
  patient: string;
  doctor: string;
  schedule: string;
  reason: string;
  notes?: string;
};

declare interface UserParams {
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
