import React from 'react'
import spinner from '../../assets/images/spinner.gif'

const BrandCard = ({ data }) => {
  return (
    <div className='w-full h-[20rem] border-[1px] rounded-2xl overflow-hidden shadow hover:shadow-lg hovering  cursor-pointer'>
      <img src={data.image || spinner} alt={data.name} className='image-cover' />
    </div>
  )
}

export default BrandCard
