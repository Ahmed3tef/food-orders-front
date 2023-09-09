import React from 'react'

const BannerShop = ({ data }) => {

  return (
    <div className='h-[30rem] md:h-[42rem] lg:h-[60rem] rounded-[1rem] md:rounded-[2rem] w-full mb-6 px-4'>
      <img src={data} alt="shop banner" className='image-cover rounded-[1rem] md:rounded-[2rem] ' />
    </div>
  )
}
// to style dots  =>   .slick-dots li button
export default BannerShop
