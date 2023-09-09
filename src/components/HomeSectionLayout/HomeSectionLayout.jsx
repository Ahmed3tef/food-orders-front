import React from 'react'

const HomeSectionLayout = (props) => {
  return (

    <div className='container-mx'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xxl:grid-cols-6 gap-5 md:gap-8 my-[1rem]">
        {props.children}
      </div>
    </div>
  )
}

export default HomeSectionLayout
