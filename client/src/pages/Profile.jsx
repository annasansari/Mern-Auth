import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import camera from '../assets/camera.png'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/firebase.js'
import { updateUserStart, updateUserSuccess, updateUserFailure, signInFailure } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'

function Profile() {
  const fileRef = useRef(null)
  const { currentUser, error, loading } = useSelector(state => state.user)
  const [progress, setProgress] = useState('')
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({})
  const [imageErr, setImageErr] = useState('')
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    if (image) {
      uploadFile(image)
    }
  }, [image])

  const uploadFile = (image) => {

    const fileName = new Date().getTime() + image.name

    const storageRef = ref(storage, `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, image);


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progress));
      },
      (error) => {
        setImageErr(true)
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL })
        });
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data))
        return;
      }
      dispatch(updateUserSuccess(data))
      setSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }
  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <div className='flex self-center border-red-300'>

            <img className='h-24 w-24 rounded-full object-cover self-center bg-slate-500' src={
              formData.profilePicture || currentUser.profilePicture} alt="" />

            <input type="file" id='file' className='hidden' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
            <label className='absolute ms-[4.8rem] mt-[3.9rem] bg-white p-1 rounded-full shadow-lg' htmlFor="file"><img className='w-4 cursor-pointer' src={camera} alt="" /></label>
          </div>

          <div className='self-center'>
            {imageErr ?
              <span className='text-red-700 font-semibold'>Image Upload failed</span> :
              progress > 0 && progress < 100 ?
                (
                  <span className='text-green-700 font-semibold'>{`Uploading: ${progress}% done`}</span>
                ) : progress == 100 ? (
                  <span className='text-green-700 font-semibold'>Image Uploaded</span>
                ) : ''
            }
          </div>

          <input onChange={handleChange} defaultValue={currentUser.username} className='border p-3 rounded-lg active:outline-none' type="text" placeholder='Username' id='username' />
          <input onChange={handleChange} defaultValue={currentUser.email} className='border p-3 rounded-lg active:outline-none' type="email" placeholder='Email' id='email' />
          <input onChange={handleChange} className='border p-3 rounded-lg active:outline-none' type="password" placeholder='Password' id='password' />
          <button className='bg-slate-800 border rounded-md p-2 text-white text-lg font-medium hover:opacity-80 uppercase'>{loading ? "updating..." : 'update'}</button>
        </form>
        <div className='flex justify-between mt-2'>
          <p className='text-red-600 font-semibold cursor-pointer'>Delete account?</p>
          <p className='text-red-600 font-semibold cursor-pointer'>Sign Out</p>
        </div>
        <div>
          <p className='text-red-600 mt-1 font-semibold'>{error ? 'Something went wrong' : ""}</p>
          <p className='text-green-600 mt-1 font-semibold'>{success ? 'User Updated successfully!' : ""}</p>
        </div>
      </div>

    </>
  )
}

export default Profile
