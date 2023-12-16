import React from 'react'
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-3'>
        <input className='border p-3 rounded-lg active:outline-none' id='email' type="email" placeholder='Email' required />
        <input className='border p-3 rounded-lg active:outline-none' id='password' type="password" placeholder='Password' required />
        <button className='bg-slate-800 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase' >sign up</button>
      </form>
      <div className='flex gap-2 mt-1 ms-1'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700 hover:underline'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default Signin