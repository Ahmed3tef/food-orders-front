import React from 'react'
import './_cards.scss'
import Spinner from '../Spinner/Spinner'
import { useNavigate } from 'react-router-dom'
const CategoryCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className='card-1 p-0 h-28' style={{
      borderColor: data.color || '#19AAAC',
      backgroundColor: data.color || '#19AAAC'
    }}
      onClick={() => navigate(`/category/${data.id}`)}
    >
      <div className="h-21 rounded-t-3xl p-[3px]  img-container-with-shadow" style={{
        borderColor: data.color || '#19AAAC'
      }}>
        {data.image ? <img src={data.image} alt="category image" className='rounded-t-3xl image-cover' /> : <Spinner />}
      </div>
      <div className="card-text-container justify-center" >
        <p >{data.name || 'Markets'}</p>
      </div>
    </div>
  )
}

export default CategoryCard
