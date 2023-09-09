import React from 'react'
import { useNavigate } from 'react-router-dom';
import catImg from '../../assets/images/hm.webp';
const RestaurantCard = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className='card-1 p-[1rem] h-[27rem] border-2' style={{
      borderColor: data.color || '#11aa99'
    }}
      onClick={() => navigate(`/shop/${data.id}`)}
    >

      <div className='rounded-xl h-[65%] restaurant-img-container'>
        <img src={data.image || catImg} alt="shop image" className='rounded-xl image-cover' />
      </div>
      <div className="card-text-container text-black px-6" >
        <p className='truncate w-full text-[2.4rem]' >{data.name || 'name'}</p>
        <p className='w-full text-center text-[2rem] text-[#2D977D]'>{`Up to ${data.maxPercent || 40}% off`}</p>
      </div>
    </div>
  )
}

export default RestaurantCard
