declare type Gender = 'male' | 'female' | 'other';

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
