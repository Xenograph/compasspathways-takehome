'use client'; // Error components must be Client Components

import Header from '@/components/Header';
import { useEffect } from 'react';

export default function Error({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header heading={`Internal Error`} />
      <main className="p-4 m-4">
        <p className="m-4 text-center text-4xl font-semibold">
          Something went wrong handling your request
        </p>
      </main>
    </>
  );
}
