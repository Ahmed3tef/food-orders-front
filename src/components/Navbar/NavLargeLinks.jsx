import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { CartIcon, NotificationIcon } from '..'

const NavLargeLinks = () => {
  return (
    <div className='flex items-center space-x-8 nav-large-links' >
      <Link to='/account' className='flex items-center'>
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--color-nav-lighter)',
            fontSize: '2.4rem',
            padding: '.4rem ',
            borderRadius: '50%',
            backgroundColor: '#F1F1F1',
            marginInlineEnd: '1rem',
          }}>
          <HiUser />
        </span>
        Account
      </Link>
      <Link to='cart' className='flex items-center space-x-4'>
        <CartIcon /> Cart
      </Link>
      <span>
        <NotificationIcon />
      </span>
    </div>
  )
}

export default NavLargeLinks
