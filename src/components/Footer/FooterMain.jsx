import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagramSquare, FaTwitterSquare, FaFacebookSquare } from 'react-icons/fa';
import appleStore from '../../assets/images/Apple Store.svg'
import googlePlay from '../../assets/images/Google Play.svg'

const FooterMain = () => {

  return (
    <div className='container-mx py-14 items-center flex flex-col space-y-12 justify-between md:flex-row '>

      {/* links */}
      <div className="w-full md:w-1/2  flex justify-between" >
        <div>
          <h3 className='text-h3Footer italic mb-4 md:mb-8'>Who We Are?</h3>
          <ul className='footer-links'>
            <li><Link to='about'>About US</Link></li>
            <li><Link to='about'>Categories</Link></li>
            <li><Link to='about'>Nearest</Link></li>
            <li><Link to='about'>Offers</Link></li>
            <li><Link to='about'>Flash Sale</Link></li>
          </ul>
        </div>
        <div>
          <h3 className='text-h3Footer italic  mb-4 md:mb-8'>Shop With Us</h3>
          <ul className='footer-links'>
            <li><Link to='account'>Your Accounts</Link></li>
            <li><Link to='orders'>Your Orders</Link></li>
            <li><Link to='cart'>Your Cart</Link></li>

          </ul>
        </div>
        <div >
          <h3 className='text-h3Footer italic  mb-4 md:mb-8'>Usage Policy</h3>
          <ul className='footer-links'>
            <li><Link to='terms'>Terms & Conditions</Link></li>
            <li><Link to='privacy-policy'>Privacy Policy</Link></li>
            <li><Link to='delivery-policy'>Shipping & Delivery Policy</Link></li>

          </ul>
        </div>

      </div>

      {/* social */}
      <div className='text-center footer-social'>
        <h3 className='text-h3Footer italic  mb-4 md:mb-8'>Join US on</h3>
        <ul className='flex text-socialLink space-x-10'>
          <li><Link to='about'><FaFacebookSquare /></Link></li>
          <li><Link to='about'><FaInstagramSquare /></Link></li>
          <li><Link to='about'><FaTwitterSquare /></Link></li>

        </ul>
      </div>

      {/* stores */}
      <div className='text-center footer-stores'>
        <h3 className='text-h3Footer italic  mb-4 md:mb-8'>Download free App</h3>
        <ul className='flex text-socialLink space-x-10'>
          <li><Link to='about'><img src={appleStore} alt="apple-store" className='md:w-60 lg:w-72' /></Link></li>
          <li><Link to='about'><img src={googlePlay} alt="google-play" className='md:w-60 lg:w-72' /></Link></li>
        </ul>
      </div>

    </div>
  )
}

export default FooterMain
