import { z } from 'zod';

export const PatientFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(255),
  email: z.string().email('Invalid email address.'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
});
