import React from 'react'
import { useNavigate } from 'react-router-dom';
import starIcon from '../../assets/images/star.svg'
const PopularNearest = ({ data }) => {
  const navigate = useNavigate()

  return (

    <div className='card-4'
      style={{
        borderColor: data.color || '#19AAAC',
        backgroundColor: data.color || '#19AAAC'
      }}
      onClick={() => navigate(`/shop/${data.id}`)}

    >
      <div className="card-with-clip-to-l w-[50%] h-full">

        <div className="h-full w-full shadow-for-clip" style={{
          borderColor: data.color || '#19AAAC'
        }}>
          <img src={data.image} alt="category image" className='rounded-[.7rem] image-cover' />
        </div>
      </div>
      <div className="card-text-container w-[50%] h-full  py-[2rem] space-y-[1rem]" >
        {/* <h1 className=' banner-h '>
          {data.title || `FREE GROCERY PICK UP! LET US DO THE SHOPING FOR YOU!`}
        </h1> */}
        <h3 className='text-[2rem]'>{data.name}</h3>
        <p className='truncate-2-lines text-base'>{data.description}</p>
        <div className='flex space-x-4 text-base'>
          <img src={starIcon} alt="rating icon" className='w-[2rem]' />
          <span>{data.average}</span>
          <span>({data.reviews})</span>
        </div>

      </div>

    </div>


  )
}

export default PopularNearest
