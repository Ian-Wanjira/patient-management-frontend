'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CustomFormField from '@/components/CustomFormField';
import { FormFieldTypes } from '@/components/forms/PatientForm';
import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { AppointmentFormDefaultValues } from '@/constants';
import { createAppointment } from '@/lib/actions/appointment.actions';
import { getDoctors } from '@/lib/actions/doctor.actions';
import { AppointmentFormSchema } from '@/lib/validation';

type AppointmentFormProps = {
  patientId: string;
  type: 'create' | 'schedule' | 'cancel';
};

const AppointmentForm = ({ patientId, type }: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await getDoctors();
      setDoctors(response);
      console.log(response);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const form = useForm<z.infer<typeof AppointmentFormSchema>>({
    resolver: zodResolver(AppointmentFormSchema),
    // @ts-expect-error Fix later
    defaultValues: {
      ...AppointmentFormDefaultValues,
      patient: patientId,
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormSchema>) => {
    setIsLoading(true);
    console.log('Appointment Form', values);
    try {
      console.log('Appointment Form', values);
      const response = await createAppointment(values);
      if (response) {
        console.log('Appointment Created: ', response);
        router.push(
          `/patient/${patientId}/new-appointment/success?appointmentId=${response.id}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  let status;
  switch (type) {
    case 'schedule':
      status = 'scheduled';
      break;
    case 'cancel':
      status = 'cancelled';
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      status = 'pending';
  }

  let buttonLabel;
  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      buttonLabel = 'Submit Appointment';
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.SELECT}
              name="doctor"
              label="Select a Doctor"
              placeholder="Select a physician"
            >
              {doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.id}>
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

            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              dateFormat="yyyy-MM-dd  -  h:mm aa"
              showTimeSelect
            />

            <div
              className={`flex flex-col gap-6 ${type === 'create' && 'xl:flex-row'}`}
            >
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.TEXTAREA}
                name="reason"
                label="Appointment reason"
                placeholder="Annual monthly check-up"
                disabled={type === 'schedule'}
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.TEXTAREA}
                name="notes"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === 'schedule'}
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
