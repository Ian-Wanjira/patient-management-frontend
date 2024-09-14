import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CarePulse',
  description: 'A health management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
