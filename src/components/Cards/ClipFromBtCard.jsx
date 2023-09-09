import React from 'react'
import spinner from '../../assets/images/spinner.gif'

const ClipFromBtCard = ({ data }) => {
  return (
    <div className='card-3 overflow-hidden h-[33rem]' style={{
      borderColor: data.color || '#72063A',
      backgroundColor: data.color || '#72063A'
    }}>
      <div className="card-with-clip-bt w-full">

        <div className="h-[20rem] rounded-b-3xl w-full shadow-for-clip" style={{
          borderColor: data.color || '#72063A'
        }}>
          <img src={data.image || spinner} alt="category image" className='rounded-b-3xl image-cover' />
        </div>
      </div>
      <div className="card-text-container  space-y-2 p-3 " >
        <div className='lines-2 text-[2.2rem]'>{data.name || 'Al Bek Restaurant'}</div>
        <div className='text-base font-semibold space-x-6'>
          <span>⭐</span>
          <span>{data.avgReview}</span>
          <span>({data.reviews})</span>
        </div>

      </div>

    </div>
  )
}

export default ClipFromBtCard
