'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import AppointmentModal from '@/components/AppointmentModal';
import StatusBadge from '@/components/StatusBadge';
import { formatDateTime } from '@/lib/utils';

export const getColumns = (page: number): ColumnDef<Appointment>[] => [
  {
    header: '#',
    cell: ({ row }) => (
      <p className="text-14-medium">{(page - 1) * 10 + row.index + 1}</p>
    ),
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status as Status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment Date',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule)}
      </p>
    ),
  },
  {
    accessorKey: 'doctor',
    header: 'Doctor',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.doctor.image}
            alt={row.original.doctor.name}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {row.original.doctor.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal type="schedule" appointment={data} />
          <AppointmentModal type="cancel" appointment={data} />
        </div>
      );
    },
  },
];
