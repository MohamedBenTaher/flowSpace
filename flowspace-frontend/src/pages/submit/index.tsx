import Navbar from '@/Components/Navbar/Navbar'
import NewPostForm from '@/Components/Post/Form/NewPostForm'
import RichTextEditorForm from '@/Components/Post/Form/NewPostText'
import React from 'react'

const index = () => {
  return (
    <div>
        <Navbar/>
        <RichTextEditorForm/>
        <NewPostForm/>
    </div>
  )
}

export default index