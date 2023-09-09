import React from 'react'
import FooterMain from './FooterMain'
import FooterMini from './FooterMini'
import './_footer.scss';
const Footer = () => {
  return (
    <footer className='bg-mainGrey text-white'>
      <FooterMain />
      <FooterMini />
    </footer>
  )
}

export default Footer
