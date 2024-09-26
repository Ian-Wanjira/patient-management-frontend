import Image from 'next/image';

import AppointmentForm from '@/components/forms/AppointmentForm';

const page = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container overflow-y-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm patientId={params.userId} type="create" />

          <p className="copyright mt-10 py-12">&#169; 2024 CarePulse</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default page;