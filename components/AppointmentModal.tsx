'use client';

import { useState } from 'react';

import AppointmentForm from '@/components/forms/AppointmentForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AppointmentModalProps = {
  type: 'cancel' | 'schedule';
  appointment: Appointment;
};

const AppointmentModal = ({ type, appointment }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === 'schedule' && 'text-green-500'}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} an appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
