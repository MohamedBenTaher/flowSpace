// import Profile from '@/assets/icons/profile'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import imgsRC  from '../../../assets/icons/user.png'
const NewPostHeader = () => {
    const router =useRouter()
  return (
    <div className='w-full flex items-center flex-row justify-evenly h-auto border-2 border-gray-300 p-3 bg-white rounded-md'>
       <div className='flex items-center justify-center mr-4' >
        <Image src={imgsRC} alt={'profile'} width={48} height={48} className=''/>   
       </div>
       <input  className='w-full rounded-md h-10 px-2 bg-slate-100 border-2 border-gray-300' placeholder='Create Post' onClick={()=>{
        router.push('/submit')}}/> 
        <button className="w-auto  hover:bg-slate-200 p-2 rounded-md" onClick={()=>{router.push('/submit')}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
        </button>
        <button className='w-auto hover:bg-slate-200 p-2 rounded-md' onClick={()=>{router.push('/submit')}}> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
         </button>
    </div>
  )
}

export default NewPostHeader