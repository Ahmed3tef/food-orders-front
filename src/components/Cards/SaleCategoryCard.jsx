import React from 'react'
import catImag from '../../assets/images/HM-Share-Image.jpg'
import './_cards.scss'
import starIcon from '../../assets/images/star.svg'
import { useNavigate } from 'react-router-dom'
const SaleCategoryCard = ({ data, type }) => {
  const navigate = useNavigate();

  return (
    <div className='card-1' style={{
      borderColor: data.color || '#72063A',
      backgroundColor: data.color || '#72063A'
    }}
      onClick={() => navigate(`/shop/${data.id}`)}
    >
      <div className="card-text-container" >
        <div className='block truncate w-full'>{data.name || 'ALESAYI'}</div>
        {!type && <p className='block text-base'>{`Offer Up to ${data.percent || 40}%`}</p>}
        {type === 'cat' && <p className='block text-base'>{`${data.branch || 'not found'}`}</p>}
        {type === 'shop' && <div className='flex space-x-4 text-base'>
          <img src={starIcon} alt="rating icon" className='w-[2rem]' />
          <span>{data.average}</span>
          <span>({data.reviews})</span>
        </div>}
      </div>
      <div className="h-21 rounded-b-3xl" style={{
        borderColor: data.color || '#72063A'
      }}>
        <img src={data.image || catImag} alt="category image" className='rounded-b-3xl image-cover' />
      </div>
    </div>
  )
}

export default SaleCategoryCard
