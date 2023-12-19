import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

function SignIn() {
  const [hasError, setHasError] = useState(false);
  // const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart());

      const response = await fetch('/api/auth/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        navigate('/profile')
      } else {
        console.log(data);
        setHasError(true);
        if (data.message === 'User not found') {
          setErrMsg('User not found');
        }
        if (data.message === 'Wrong credentials') {
          setErrMsg('Wrong credentials!');
        }
        dispatch(signInFailure(data));
      }

      dispatch(signInSuccess(data));

    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
    }
  }
  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='email' type="email" placeholder='Email' required />
          <input className='border p-3 rounded-lg active:outline-none' onChange={handleChange} id='password' type="password" placeholder='Password' required />
          <button className='bg-slate-800 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase' >{loading ? 'Loading...' : 'Sign In'}</button>
          <OAuth />
        </form>
        <p className='text-red-600 ms-1 mt-2'>{hasError ? errMsg : ""}</p>
        <div className='flex gap-2 mt-1 ms-1'>
          <p>Have an account?</p>
          <Link to={'/signup'}>
            <span className='text-blue-700 hover:underline'>Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  )
}
export default SignIn



// try {
//   dispatch(signInStart());
//   await axios.post('/api/auth/Signin', formData)
//     .then((res) => {
//       console.log(res);
//       dispatch(signInSuccess(res.data));
//       // navigate('/profile')
//     })
//     .catch((err) => {
//       console.log(err);
//       setHasError(true)
//       if (err.response.data.message === 'User not found') {
//         setErrMsg('User not found')
//       }
//       if (err.response.data.message === 'Wrong credentials') {
//         setErrMsg('Wrong credentials!')
//       }
//       dispatch(signInSuccess());
//     })
// } catch (error) {
//   dispatch(signInFailure(error));
//   console.log(error);
//   // setError(true)
// }