import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { loadSidebarCategories } from '../../store/reducers/sidebarData'

const Sidebar = () => {

  const navigate = useNavigate();


  const sidebarCategories = useSelector(state => state.sidebarCategories.sidebarCategories)
  const dispatch = useDispatch()
  const [sidebarWidth, setSidebarWidth] = useState('35rem')
  useEffect(() => {
    dispatch(loadSidebarCategories())
  }, [])

  return (
    <div className='w-[35rem] h-[40rem] overflow-y-scroll bg-sidebarBg  py-[1rem] px-[2rem] lg:px-[6rem] shadow-md sidebar' style={{
      marginInlineEnd: '3rem',
      width: sidebarWidth
    }}>
      <ul className='space-y-6'>

        {sidebarCategories.map((e, i) => <Link key={i} to={`/category/${e.id}`} className='cursor-pointer flex items-center'>
          <div className="w-[3rem] h-[3rem] rounded-full flex items-center justify-center bg-gradient-to-b from-purple-500 to-pink-500" style={{
            marginInlineEnd: '1rem',

          }}

          >
            <img src={e.icon} alt={e.name} className='w-[2.5rem] ' />
          </div>

          <span className='italic text-base'
            //   onMouseEnter={() =>
            //   setSidebarWidth('100%')

            // } onMouseLeave={() => setSidebarWidth('35rem')}
            style={{

            }}>{e.name}</span>
        </Link>)}
      </ul>
    </div>
  )
}

export default Sidebar
