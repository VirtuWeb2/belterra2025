import React from 'react'

const Loader = () => {
  return (
    <div className='w-[100vw] h-[100vh] fixed left-0 top-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center z-[10]'>
        <div className="loader"></div>
    </div>
  )
}

export default Loader