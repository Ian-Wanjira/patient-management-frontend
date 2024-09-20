import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const registerPatient = async (patient: FormData) => {
  console.log(patient);
  try {
    const response = await axiosInstance.post(
      '/api/patient/complete-registration/',
      patient,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
