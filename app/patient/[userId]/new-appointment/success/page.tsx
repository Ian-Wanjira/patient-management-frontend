import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
const page = async ({ searchParams, params: { userId } }: SearchParamProps) => {
  const appointment = await getAppointment(
    searchParams.appointmentId as string,
  );
  const schedule = formatDateTime(appointment.schedule);
  console.log('Scheduled Date: ', schedule);

  return (
    <div className="flex h-screen max-h-screen px[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            className="h-10 w-fit"
            alt="logo"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details :</p>
          <div className="flex items-center gap-3">
            <Image
              src={appointment.doctor.image}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {appointment.doctor.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{schedule}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patient/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">&#169; 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default page;
