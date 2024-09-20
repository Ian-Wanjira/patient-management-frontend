import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CustomFormField from '@/components/CustomFormField';
import { FileUploader } from '@/components/FileUploader';
import SubmitButton from '@/components/SubmitButton';
import { Form, FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SelectItem } from '@/components/ui/select';
import {
  PatientFormDefaultValues,
  GenderOptions,
  Doctors,
  IdentificationTypes,
} from '@/constants';
import { registerPatient } from '@/lib/actions/patient.actions';
import { RegisterFormSchema } from '@/lib/validation';

import { FormFieldTypes } from './PatientForm';

const RegisterForm = ({ patientData }: { patientData: UserParams }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        // Handle the `identificationDocument` field explicitly
        if (key === 'identificationDocument' && Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append(`identificationDocument`, file); // Correct handling of files
            }
          });
          return; // Skip further processing for `identificationDocument`
        }
        // Handle all other fields (boolean, string, etc.)
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const response = await registerPatient(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="User Icon"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="Email Icon"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="phone"
              label="Phone Number"
            />
          </div>

          {/* BIRTHDATE & GENDER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.DATE_PICKER}
              name="dateOfBirth"
              label="Date of Birth"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.SKELETON}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* ADDRESS & OCCUPATION */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="address"
              label="Address"
              placeholder="123 Main St, New York"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>

          {/* EMERGENCY CONTACT NAME & EMERGENCY CONTACT NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Jane Doe"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="emergencyContactPhone"
              label="Emergency Contact Number"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="primaryCarePhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="insuranceProvider"
              label="Insurance"
              placeholder="BlueCross Blueshield"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="insurancePolicyNumber"
              label="Policy Number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGIES & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="allergies"
              label="Allergies"
              placeholder="Peanuts, Shellfish"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="currentMedications"
              label="Current Medications"
              placeholder="Ibuprofen, Aspirin"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SKELETON}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="treatmentConsent"
            label="I consent to treatment"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="privacyConsent"
            label="I consent to privacy policy"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="password"
            label="Password"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Register and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
