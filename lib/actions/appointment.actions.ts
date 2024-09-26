import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createAppointment = async (values: Appointment) => {
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

export const getAppointment = async (id: string) => {
  try {
    const response = await axiosInstance(`/api/appointment/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
