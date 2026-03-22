import React from 'react'
import {assets} from "../assets/assets"
const NavBar = () => {
  return (
    <div>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button className='bg-gray-600 text-white py-2 px-5 sm:px-2 rounded-full hover:bg-gray-700'>Logout</button>
    </div>
  )
}

export default NavBar