import React from 'react'
import catImag from '../../assets/images/HM-Share-Image.jpg'
const BannerCard = ({ data }) => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='banner-card'
        style={{
          borderColor: data.color || '#19AAAC',
          backgroundColor: data.color || '#19AAAC'
        }}
      >
        <div className="card-text-container w-[50%] h-full  pb-[4%] pt-[8%] justify-between" >
          <h1 className=' banner-h '>
            {data.title || `FREE GROCERY PICK UP! LET US DO THE SHOPING FOR YOU!`}
          </h1>
          <button className='banner-btn' style={{
            color: data.color || '#19AAAC'
          }}>Click here to place your order</button>
        </div>
        <div className="card-with-clip-l w-[50%] h-full">

          <div className="h-full rounded-r-3xl w-full shadow-for-clip" style={{
            borderColor: data.color || '#19AAAC'
          }}>
            <img src={data.image || catImag} alt="category image" className='rounded-r-3xl image-cover' />
          </div>
        </div>
      </div>
    </div>

  )
}

export default BannerCard
