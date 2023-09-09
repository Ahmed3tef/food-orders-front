import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomeSectionTitle = (props) => {
  const navigate = useNavigate();
  return (
    <div className='w-full px-10 md:px-24 flex my-4 md:my-8 justify-between items-center'>
      <h3 className='title-section-head'>{props.title}</h3>
      <div
        className='btn-section-head'
        onClick={() => navigate(`${props.path || '/'}`)}
      >
        View More
      </div>
    </div>
  )
}

export default HomeSectionTitle


