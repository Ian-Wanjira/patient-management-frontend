import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getDoctors = async () => {
  try {
    const response = await axiosInstance.get('/api/doctor/list/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDoctor = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/doctor/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
