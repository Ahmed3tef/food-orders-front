import React from 'react'
import { Link } from 'react-router-dom'
import { SearchBar, SidebarMenu } from '..'
import NavLargeLinks from './NavLargeLinks'

const NavLarge = () => {
  return (
    <div className='container-mx flex justify-between items-center py-8'>
      <div className="menu flex items-center">
        {/* <SidebarMenu /> */}
        <Link to='/' id="logo" className='mr-auto text-navLogo'>Promarket</Link>
      </div>
      <SearchBar />
      <NavLargeLinks />
    </div>
  )
}

export default NavLarge
