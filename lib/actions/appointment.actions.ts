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

export const getAppointments = async (
  page: number,
): Promise<AppointmentAPIResponse> => {
  try {
    const response = await axiosInstance.get(
      `/api/appointment/list/?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
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
