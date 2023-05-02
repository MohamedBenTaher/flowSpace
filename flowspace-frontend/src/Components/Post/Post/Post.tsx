import React from 'react'
import { CreatePost } from '../dto/create-post.dto'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Post = (props:CreatePost) => {
  console.log(props.content)
  return (
    <div className=" bg-white max-w-full min-h-full h-96 flex items-start p-2 justify-start flex-col border-2 border-gray-400 rounded-lg my-2 shadow-slate-400 shadow-sm">
      <h1 className='text-2xl '>{props.title}</h1>
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </div>
  )
}

export default Post