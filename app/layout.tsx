import type { Metadata } from 'next';

// These styles apply to every route in the application
import './globals.css';
import React from 'react';
import { Providers } from '../config/Providers';

export const metadata: Metadata = {
  title: 'App',
  description: 'Made with next.js and tailwindcss',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}