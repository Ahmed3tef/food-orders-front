import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

const PageNavigation = (props) => {

  return (
    <div className='flex space-x-[2.5rem] items-center mt-8 px-10 md:px-24 '>
      {props.title1 && <Link to={props.path1 || '/'}>{props.title1}</Link>}
      {props.title2 &&
        <span className='text-[2rem]'>
          <MdKeyboardArrowRight />
        </span>}
      {props.title2 && <Link to={props.path2 || ''}>{props.title2}</Link>}
      {props.title3 &&
        <span className='text-[2rem]'>
          <MdKeyboardArrowRight />
        </span>}
      {props.title3 && <Link to={props.path3 || ''}>{props.title3}</Link>}
    </div>
  )
}

export default PageNavigation
