import React from 'react'
import NavLarge from './NavLarge'
import NavMini from './NavMini'
import './_navbar.scss';

const Navbar = () => {
  return (
    <nav className='bg-mainGrey text-white nav'>
      <NavMini />
      <NavLarge />
    </nav>
  )
}

export default Navbar
