import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getAppointments } from '@/lib/actions/appointment.actions';

const useAppointments = (page: number) => {
  return useQuery({
    queryKey: ['appointments', page],
    queryFn: async () => await getAppointments(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};

export default useAppointments;
