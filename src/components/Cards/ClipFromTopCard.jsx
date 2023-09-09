import React from 'react'
import catImag from '../../assets/images/HM-Share-Image.jpg'
import spinner from '../../assets/images/spinner.gif'
import Spinner from '../Spinner/Spinner'

import './_cards.scss'
const ClipFromTopCard = ({ data }) => {
  return (
    <div className='card-3 overflow-hidden' style={{
      borderColor: data.color || '#72063A',
      backgroundColor: data.color || '#72063A'
    }}>
      <div className="card-text-container  space-y-2 p-3" >
        <div className='lines-2 text-[1.8rem]'>{data.shopName || 'Puritans Pride VITAMIN D3 10000 IU 250 Mcg 100 CAP'}</div>
        <p className='block text-base font-semibold'>{`SAR ${data.price || 680}`}</p>
        <p className='block text-base font-semibold'>{`${data.name || 'Pharmacy'}`}</p>
      </div>
      <div className="card-with-clip w-full">

        <div className="h-[20rem] rounded-b-3xl w-full shadow-for-clip" style={{
          borderColor: data.color || '#72063A'
        }}>
          {data.image ? <img src={data.image} alt="category image" className='rounded-b-3xl image-cover' /> : <Spinner />}
        </div>
      </div>
    </div>
  )
}

export default ClipFromTopCard
