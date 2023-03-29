import LoginForm from '@/components/Auth/LoginForm'
import React from 'react'

const Auth = () => {
  return (
    <div className='w-full flex items-center justify-around flex-col sm:flex-row px-10'>
     <div className=' lg:w-1/2 sm:w-full bg-red-600  h-1/2 sm:h-screen'>
        hello
     </div>
     <div className='flex flex-wrap items-center justify-center lg:w-1/2 sm:w-full bg-green-400 h-1/2 sm:h-screen'>
     <LoginForm />
     </div>
    </div>
  )
}

export default Auth