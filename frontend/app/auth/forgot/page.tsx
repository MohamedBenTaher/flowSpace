import ForgotForm from '@/components/Auth/ForgotForm'
import React from 'react'

function page() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center'>
            <h3 className='font-bold text-3xl mb-2'>FlowSpace</h3>
            <div className='font-thin mb-16 '>Send Reset Email</div>
            <ForgotForm/>
            <div className='font-thin'> we will send a link to the provided email, please check you spam folder incase you didn&apos;t find it</div>
        </div>
    </div>
  )
}

export default page