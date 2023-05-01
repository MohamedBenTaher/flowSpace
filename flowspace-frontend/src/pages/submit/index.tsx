import Navbar from '@/Components/Navbar/Navbar'
import NewPostForm from '@/Components/Post/Form/NewPostForm'
import MyForm from '@/Components/Post/Form/NewPostText';
import RichTextInput from '@/Components/Post/Form/NewPostText';




import React from 'react'

const index = () => {

  return (
    <div className='h-screen w-screen bg-slate-100'>
        <Navbar/>
        <div className='flex items-center justify-center p-2 m-4'>
        <MyForm/>
        </div>
    </div>
  )
}

export default index