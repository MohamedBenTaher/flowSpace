import React from 'react'

const ConfirmationLoader = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
        <h3 className='text-2xl font-bold'>Confriming Account </h3>
        <div className="flex items-center justify-center space-x-2 animate-pulse mt-5">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
         </div>
         <h3 className='mt-5'>You will be redirected soon...</h3>
    </div>
  )
}

export default ConfirmationLoader