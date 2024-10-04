'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createAppointment = async (values: AppointmentForm) => {
  console.log('Appointment: ', values);
  try {
    const response = await axiosInstance.post(
      '/api/appointment/schedule-appointment/',
      values,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get('/api/appointment/list/');
    const appointments = response.data;

    const counts = appointments.reduce(
      (acc: AppointmentCounts, appointment: Appointment) => {
        if (appointment.status === 'scheduled') {
          acc.scheduled++;
        } else if (appointment.status === 'pending') {
          acc.pending++;
        } else if (appointment.status === 'cancelled') {
          acc.cancelled++;
        }

        return acc;
      },
      { scheduled: 0, pending: 0, cancelled: 0 },
    );

    return { appointments, counts };
  } catch (error) {
    console.error(error);
  }
};

export const getAppointment = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/appointment/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAppointment = async (
  id: string | undefined,
  updateDetails: ScheduleAppointmentForm,
) => {
  console.log('Schedule Appointment clicked!');
  try {
    const response = await axiosInstance.put(
      `/api/appointment/update/${id}/`,
      updateDetails,
    );
    console.log('Updated Appointment: ', response.data);

    if (response.status === 200) {
      revalidatePath('/admin');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
