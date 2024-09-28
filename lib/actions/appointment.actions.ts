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
    const response = await axiosInstance(`/api/appointment/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
