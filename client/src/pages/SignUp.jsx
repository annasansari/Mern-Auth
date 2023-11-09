import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
    console.log(formData);
  }
  
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('hello');
    try {
      axios.post('/api/auth/signup', formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      setLoading(false)
      setError(false)
    } catch (error) {
      console.log(error);
    }
    setError(false)
  }
  console.log(loading);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-3' onSubmit={submitHandler}>
        <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='username' type="text" placeholder='Username' />
        <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='email' type="email" placeholder='Email' />
        <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='password' type="password" placeholder='Password' />
        <button className='bg-slate-800 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase' >{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp







// {
//   method: 'POST ',
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(formData)
// }
// )

// const data = await res.json()
// console.log(data);