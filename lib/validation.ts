import { z } from 'zod';

export const PatientFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(255),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
    message: 'Invalid phone number',
  }),
});

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(['male', 'female', 'other']),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters' })
    .max(100, { message: 'Address must be at most 100 characters' }),
  occupation: z
    .string()
    .min(2, { message: 'Occupation must be at least 2 characters' })
    .max(100, { message: 'Occupation must be at most 100 characters' }),
  emergencyContactName: z
    .string()
    .min(2, { message: 'Contact name must be at least 2 characters' })
    .max(100, { message: 'Contact name must be at most 100 characters' }),
  emergencyContactPhone: z
    .string()
    .refine(
      (emergencyContactPhone) => /^\+\d{10,15}$/.test(emergencyContactPhone),
      { message: 'Invalid phone number' },
    ),
  primaryCarePhysician: z
    .string()
    .min(1, { message: 'Select at least 1 doctor' }),
  insuranceProvider: z
    .string()
    .min(2, { message: 'Insurance name must be at least 2 characters' })
    .max(50, { message: 'Insurance name must be at most 50 characters' }),
  insurancePolicyNumber: z
    .string()
    .min(2, { message: 'Policy number must be at least 2 characters' })
    .max(50, { message: 'Policy number must be at most 50 characters' }),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password must be at most 50 characters' }),
});
