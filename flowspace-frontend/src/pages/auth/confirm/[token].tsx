import React ,{useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';
import LoginForm from '@/Components/Auth/LoginForm';
import SignInForm from '@/Components/Auth/SigninForm';
import { confirmAccount } from '@/services/api';
import { useRouter } from 'next/router';
import ConfirmationLoader from '@/Components/Auth/ConfirmationLoader';

const Auth = () => {
    const searchParams = useSearchParams();
    const [confirmed,setConfirmed]=useState(false)
    const token = searchParams.get('token');
    const router=useRouter()
    async function handleConfirmAccount(token:string) {
        if (token) {
          const confirmed = await confirmAccount(token);
          if (confirmed) {
            setConfirmed(true);
            router.push('/auth?confirmed=true');
          }
        }
      }

      useEffect(() => {
        if(token){
            handleConfirmAccount(token);
        }
      }, [token]);

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <ConfirmationLoader/>
    </div>
  )
}