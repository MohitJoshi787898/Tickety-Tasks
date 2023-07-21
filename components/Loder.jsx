import React from 'react'

const Loder = () => {
  return (
    <div className=" flex w-full h-[100vh] justify-center flex-col items-center bg-gray-100">
    <h1 className=" text-4xl font-extrabold font-serif text-gray-900">
      Loading...
    </h1>
    <div
      className="spin w-20 h-20 border-8 mt-5
 border-black border-b-gray-500 rounded-full rotate-90
  animation: spin 1s linear infinite  outline-offset-2   outline-black
  @keyframes spin {
    from {
      transform: rotate(0deg); 
    }
    to {
      transform: rotate(360deg);
  }
  
  "
    ></div>
  </div>
  )
}

export default Loder
