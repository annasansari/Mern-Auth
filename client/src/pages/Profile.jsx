import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-3'>
          <img className='h-24 w-24 rounded-full object-cover self-center bg-slate-500' src={currentUser.profilePicture} alt="" />
          <input defaultValue={currentUser.username} className='border p-3 rounded-lg active:outline-none' type="text" placeholder='Username' />
          <input defaultValue={currentUser.email} className='border p-3 rounded-lg active:outline-none' type="email" placeholder='Email' />
          <input className='border p-3 rounded-lg active:outline-none' type="password" placeholder='Password' />
          <button className='bg-slate-800 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase' >update</button>
        </form>
        <div className='flex justify-between mt-2'>
          <p className='text-red-600 font-semibold cursor-pointer'>Delete account?</p>
          <p className='text-red-600 font-semibold cursor-pointer'>Sign Out</p>
        </div>
      </div>
    </>
  )
}

export default Profile