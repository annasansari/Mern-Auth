import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase/firebase'
import { signInSuccess } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            const { email, displayName, photoURL } = result.user

            const response = await axios.post('/api/auth/google', {
                displayName,
                email,
                photoURL
            });

            const data = await response.data;
            console.log(data);
            dispatch(signInSuccess(data));

            navigate('/profile')

        } catch (error) {
            console.log("Could'nt login with google", error);
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='bg-red-600 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase'>continue with google</button>
    )
}

export default OAuth