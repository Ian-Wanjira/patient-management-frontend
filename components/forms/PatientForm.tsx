'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CustomFormField from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';
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
      username: '',
      email: '',
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof PatientFormSchema>) {
    setIsLoading(true);
    setRegisterForm(true);
    userData(values);

    try {
      console.log(values);
    } catch (error) {
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="username"
          label="Username"
          placeholder="username"
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
          fieldType={FormFieldTypes.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
