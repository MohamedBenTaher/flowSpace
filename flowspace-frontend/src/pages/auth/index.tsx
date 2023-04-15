import React ,{useState} from 'react'
import { useSearchParams } from 'next/navigation';
import LoginForm from '@/Components/Auth/LoginForm';
import SignInForm from '@/Components/Auth/SigninForm';
const Auth = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('confirmed');
    const reset = searchParams.get('reset');
    const unauthorized = searchParams.get('unauthorized');
    const [isMember,setIsMember]=React.useState<boolean>(search||reset||unauthorized? true :false)
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  return (
    <div className='w-full flex items-center justify-around flex-col sm:flex-row px-10'>
     <div className=' lg:w-1/2 sm:w-full h-1/2 sm:h-screen p-3 flex items-center flex-col '>
      <div className="w-full h-60 font-bold text-lg font-sans mt-5 text-left flex justify-start ">FlowSpace</div>
      <div className=" h-full font-bold text-4xl font-sans flex justify-start items-center ">Get it in the flow improve yourself and join a community of creatives and masters</div>
     </div>
     {/* bg image and illustration to be added */}
     <div className='flex flex-wrap items-center justify-center lg:w-1/2 sm:w-full  h-1/2 sm:h-screen'>
    <div>
    </div>
    {isMember ?
     <LoginForm setIsMember={setIsMember} confirmed={search} reset={reset} unauthorized={unauthorized}/>
     :
     <SignInForm setIsMember={setIsMember}/>
    }
     </div>
    </div>
  )
}

export default Auth