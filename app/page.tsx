'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import PatientForm from '@/components/forms/PatientForm';

const Home = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  console.log('RegisterForm', isRegisterForm);
  const [userParams, setUserParams] = useState({
    username: '',
    email: '',
    phone: '',
  });
  console.log('UserParams', userParams);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm
            setRegisterForm={setIsRegisterForm}
            userData={(params) => {
              setUserParams(params);
            }}
          />

          <div className="text-14-regular mt-20 flex justify-between">
            <span className="justify-items-end text-dark-600 xl:text-left">
              &#169; 2024 CarePulse
            </span>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="Doctor"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
