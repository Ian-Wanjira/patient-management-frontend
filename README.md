# Patient Management Frontend

A healthcare patient management system that allows patients to easily register, book, and manage their appointments with doctors. This system features administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications. Built using Next.js and DjangoRestFramework.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Patient registration and profile management
- Appointment booking and management
- Administrative tools for scheduling, confirming, and canceling appointments
- SMS notifications for appointment reminders
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, React Query
- **Backend:** DjangoRestFramework (included in this [repo](https://github.com/Ian-Wanjira/patient-management-api))
- **Dependencies:**
  - Form validation: `react-hook-form, zod`, `@hookform/resolvers`
  - UI components: `shadcn ui,@radix-ui`, `lucide-react`
  - HTTP client: `axios`
  - State management: `react-query`
  - Date picker: `react-datepicker`
  - OTP input: `input-otp`
  - Phone number input: `react-phone-number-input`
  - Animations: `tailwindcss-animate`

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/Ian-Wanjira/patient-management-frontend.git
cd patient-management-frontend
```

Next, install the dependencies:

```
npm install
# or
yarn install
# or
pnpm install
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
