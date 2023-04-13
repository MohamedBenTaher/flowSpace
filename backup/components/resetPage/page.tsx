'use client'
import PasswordResetForm from '@/components/Auth/PasswordResetForm'
import React from 'react'
import { useSearchParams } from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();
    const reset = searchParams.get('token');    
    console.log('reset',reset)
  return (
    <div className='w-sceen h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center'>
        <h3 className='font-bold text-3xl mb-2'>FlowSpace</h3>
        <div className='font-thin mb-16 '>Reset Your Password</div>
        <PasswordResetForm token={reset}/>
        </div>
    </div>
  )
}

export default Page