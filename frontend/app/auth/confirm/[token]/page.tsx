'use client'
import { useEffect } from 'react';
import ConfirmationLoader from '@/components/Auth/ConfirmationLoader';
import { useRouter } from 'next/navigation';

interface Params {
  token: string;
}

interface Props {
  params: Params;
}

export default function ConfirmationPage({ params }: Props): JSX.Element {
    const router = useRouter();
  useEffect(() => {
    const confirmEmail = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hash: params.token }),
        });

        if (response.ok) {
          console.log(await response.json());
          router.push('/auth')
        } else {
          console.log(`Server responded with ${response.status} status code`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.token) {
      confirmEmail();
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <ConfirmationLoader />
    </div>
  );
}
