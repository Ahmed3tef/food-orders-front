import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CategoryHeader = ({ data }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='flex justify-center items-center w-full text-white text-[4rem] font-Roboto font-bold rounded-xl  shadow-md h-[10rem] my-6' style={{
        backgroundColor: data.color || '#19AAAC'
      }}>
        {data.name}
      </div>
      <div className="flex justify-end">
        <Link
          className='btn-section-head bg-[#EFE2ED] text-[#5F67EE] w-[13rem]'
          to={`/category/${data.id}`}
          onClick={() => navigate(`/category/${data.id}`)}
        >
          View More
        </Link>

      </div>


    </>
  )
}

export default CategoryHeader
