'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CustomFormField = dynamic(() => import('@/components/CustomFormField'));

import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';
import { InitialFormDefaultValues } from '@/constants';
import { PatientFormSchema } from '@/lib/validation';

export enum FormFieldTypes {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SKELETON = 'skeleton',
}

type PatientFormProps = {
  setRegisterForm: Dispatch<SetStateAction<boolean>>;
  userData: Dispatch<SetStateAction<z.infer<typeof PatientFormSchema>>>;
};

const PatientForm = ({ setRegisterForm, userData }: PatientFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormSchema>>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      ...InitialFormDefaultValues,
    },
  });

  const onSubmit = (values: z.infer<typeof PatientFormSchema>) => {
    setIsLoading(true);
    setRegisterForm(true);

    try {
      userData(values);
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-8 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email icon"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.PHONE_INPUT}
          name="phone"
          label="Phone Number"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
