import React from 'react'
import { CreatePost } from '../dto/create-post.dto'

const Post = (props:CreatePost) => {
  return (
    <div className=" bg-white max-w-full min-h-full h-96 flex items-start p-2 justify-start flex-col border-2 border-gray-400 rounded-lg my-2 shadow-slate-400 shadow-sm">
      <h3>{props.content}</h3>
      <p>{props.published}</p>
    </div>
  )
}

export default Post