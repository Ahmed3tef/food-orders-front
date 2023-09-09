import React from 'react'
import catImag from '../../assets/images/HM-Share-Image.jpg'
import ProgressBar from './ProgressBar'
import './_cards.scss'
const SaleProductCard = ({ data, type }) => {
  return (
    <div className='card-2 relative' >
      {data.percent > 0 && <div className="badge ">- {data.percent} %</div>}
      <div className={type === 'progress' ? 'h-[55%]' + ' rounded-t-3xl border-b-2' : 'h-[65%]' + ' rounded-t-3xl border-b-2'}>
        <img src={data.image ? data.image : catImag} alt="category image" className='rounded-t-2xl image-cover' />
      </div>
      <div className="card-text-container text-black px-6" >
        <p className='truncate w-full' >{data.name || 'Genuine Leather Wallet Genuine Leather Wallet'}</p>
        <p className='text-base'>SAR {data.price || '30'}</p>
        {/* <p >{data.text || 'Markets'}</p> */}
        {type === 'progress' && <ProgressBar full={data.stock} remaining={data.remaining} />}
      </div>
    </div>
  )
}

export default SaleProductCard
