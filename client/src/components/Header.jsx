import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <>
            <div className="bg-slate-300">
                <div className=' flex justify-between p-4 items-center max-w-6xl mx-auto'>
                    <Link to={'/'}> <h1 className='text-2xl font-bold text-slate-500'>Mern<span className='text-slate-800'>Auth</span> </h1></Link>
                    <ul className='flex justify-center gap-4 cursor-pointer font-medium flex-wrap'>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/about'}><li>About</li></Link>
                        <Link to={'/signin'}><li>Sign In</li> </Link>
                        <Link to={'/profile'}><li>Profile</li></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header