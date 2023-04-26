import React from 'react'

const Post = ({title,content}) => {
  return (
    <div className="max-w-max h-auto flex items-center justify-start flex-col">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}

export default Post