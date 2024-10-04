'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CustomFormField from '@/components/CustomFormField';
import { FormFieldTypes } from '@/components/forms/PatientForm';
import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment.actions';
import { getDoctors } from '@/lib/actions/doctor.actions';
import {
  getAppointmentSchema,
  AppointmentFormSchema,
  ScheduleAppointmentSchema,
  CancelAppointmentSchema,
} from '@/lib/validation';

type AppointmentFormProps = {
  patientId?: string;
  type: 'create' | 'schedule' | 'cancel';
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const AppointmentForm = ({
  patientId,
  type,
  appointment,
  setOpen,
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  console.log('Appointment Id: ', appointment?.id);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await getDoctors();
      setDoctors(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching doctors: ', error);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const form = useForm<
    z.infer<
      | typeof AppointmentFormSchema
      | typeof ScheduleAppointmentSchema
      | typeof CancelAppointmentSchema
    >
  >({
    resolver: AppointmentFormValidation
      ? zodResolver(AppointmentFormValidation)
      : undefined,
    defaultValues: {
      doctor: appointment?.doctor.id,
      schedule: appointment?.schedule
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : '',
      notes: appointment?.notes || '',
      cancellationReason: appointment?.cancellationReason || '',
      patient: patientId,
    },
  });

  const onSubmit = async (
    values: z.infer<
      | typeof AppointmentFormSchema
      | typeof ScheduleAppointmentSchema
      | typeof CancelAppointmentSchema
    >,
  ) => {
    console.log(form.formState.errors);
    setIsLoading(true);
    console.log('Appointment Form', values);
    console.log('Patient Id: ', patientId);
    console.log('Schedule Appointment clicked!');

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
    try {
      if (type === 'create') {
        console.log('Appointment Form', values);
        const response = await createAppointment(values as AppointmentForm);
        if (response) {
          console.log('Appointment Created: ', response);
          router.push(
            `/patient/${patientId}/new-appointment/success?appointmentId=${response.id}`,
          );
        }
      } else {
        const updateDetails = {
          doctor: values.doctor,
          schedule: values.schedule,
          status: status,
          cancellationReason: values.cancellationReason,
        };
        console.log('Update Details: ', updateDetails);
        const updatedAppointment = await updateAppointment(
          appointment?.id,
          updateDetails,
        );

        if (updatedAppointment) {
          setOpen && setOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
