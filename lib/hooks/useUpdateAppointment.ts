import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAppointment } from '@/lib/actions/appointment.actions';

type UpdateAppointmentParams = {
  id: string;
  updateDetails: ScheduleAppointmentForm;
};

const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateDetails }: UpdateAppointmentParams) =>
      updateAppointment(id, updateDetails),

    // Optimistic update to reflect the changes immediately on the UI
    onMutate: async ({ id, updateDetails }: UpdateAppointmentParams) => {
      await queryClient.cancelQueries({ queryKey: ['appointments'] });

      // Snapshot of the previous value
      const previousAppointments = queryClient.getQueryData<Appointment[]>([
        'appointments',
      ]);

      // Optimistically update the data locally
      if (previousAppointments) {
        queryClient.setQueryData<Appointment[]>(['appointments'], (old) =>
          old?.map((appointment) =>
            appointment.id === id
              ? {
                  ...appointment,
                  doctor: {
                    id: updateDetails.doctor,
                    name: '',
                    email: '',
                    image: '',
                  },
                  schedule: updateDetails.schedule,
                  reason: updateDetails.reason,
                  notes: updateDetails.notes,
                  status: updateDetails.status,
                  cancellationReason: updateDetails.cancellationReason,
                }
              : appointment,
          ),
        );
      }

      // Return the context with the previous appointments for rollback on error
      return { previousAppointments };
    },

    // If the mutation fails, rollback to the previous state
    onError: (error, variables, context) => {
      if (context?.previousAppointments) {
        queryClient.setQueryData(
          ['appointments'],
          context.previousAppointments,
        );
      }
      console.error('Failed to update appointment:', error);
    },

    // After a successful mutation, invalidate the cache to refetch the latest data
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });
    },
  });
};

export default useUpdateAppointment;
