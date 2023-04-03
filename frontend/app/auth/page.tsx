'use client'
import LoginForm from '@/components/Auth/LoginForm'
import SignInForm from '@/components/Auth/SigninForm'
import React ,{useState} from 'react'

const Auth = () => {
    const [isMember,setIsMember]=React.useState<boolean>(false)
  return (
    <div className='w-full flex items-center justify-around flex-col sm:flex-row px-10'>
     <div className=' lg:w-1/2 sm:w-full bg-red-600  h-1/2 sm:h-screen'>
        hello
     </div>
     <div className='flex flex-wrap items-center justify-center lg:w-1/2 sm:w-full bg-green-400 h-1/2 sm:h-screen'>
    <div>
    </div>
    {isMember ?
     <LoginForm setIsMember={setIsMember}/>
     :
     <SignInForm setIsMember={setIsMember}/>
    }
     </div>
    </div>
  )
}

export default Auth