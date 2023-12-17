import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')
    const [checkSuccess, setCheckSuccess] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value
        })
        console.log(formData);
        console.log(formData.username);
        localStorage.setItem("userDetails", JSON.stringify({
          ...formData,
          [e.target.id]: e.target.value
        }))
      }
      const userInfo = localStorage.getItem('userDetails')
      const parsedData = JSON.parse(userInfo);
      
      console.log(parsedData.username);
      const submitHandler = async (e) => {
        e.preventDefault()
        try {
          setError(false)
          setLoading(true)
          setCheckSuccess(false)
          await axios.post('/api/auth/signup', formData)
            .then((res) => {
              console.log(res);
              setCheckSuccess(true)
              console.log(res.data.message);
              if (res.data.message == 'User Create Successfully') {
                setSuccess('Account created successfully!')
              }
              navigate('/signin')
            })
            .catch((err) => {
              console.log(err.response.data.message)
              setError(true)
              // if (err.message === 'Request failed with status code 500') {
              //   setErrMsg("Something went wrong")
              // }
              if (err.response.data.message == `E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "${parsedData.username}" }`) {
                setErrMsg(`Username or Email already been taken`)
              }
            })
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setError(true)
        }
      }
    
    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
                <form className='flex flex-col gap-3' onSubmit={submitHandler}>
                    <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='username' type="text" placeholder='Username' />
                    <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='email' type="email" placeholder='Email' />
                    <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='password' type="password" placeholder='Password' />
                    <button className='bg-slate-800 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase' >{loading ? 'Loading...' : 'Sign Up'}</button>
                </form>
                <p className='text-green-600 ms-1 mt-3'>{checkSuccess ? success : ""}</p>
                <p className='text-red-600 ms-1 mt-3'>{error ? errMsg : ""}</p>
                <div className='flex gap-2 mt-2 ms-1'>
                    <p>Have an account?</p>
                    <Link to={'/signin'}>
                        <span className='text-blue-700 hover:underline'>Sign In</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default SignUp