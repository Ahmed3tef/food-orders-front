import React from 'react'
import './_cards.scss'
import closeIcon from '../../assets/images/close-icon-notifications.svg'
const NotificationCard = ({ image, title, date, path }) => {
  return (

    <div className="w-full mx-auto bg-white rounded-xl  flex items-center gap-[1rem] border-2 notification-card cursor-pointer relative" style={{
      height: path === 'notifications' ? '12rem' : '7rem',
      padding: path === 'notifications' ? '2rem' : '.5rem'
    }}>
      <div className="shrink-0 rounded-full overflow-hidden  notification-image shadow-md" style={{
        width: path === 'notifications' ? '9rem' : '16%'
      }}>
        <img className="w-full h-full object-fill" src={image} alt="notification avatar" />
      </div>
      <div className='notification-text italic font-bold font-Roboto flex flex-col w-9/12 items-center h-fit' style={{
        gap: path === 'notifications' ? '2rem' : '.5rem'
      }}>
        <h4 className="notification-title text-black">{title}</h4>
        <p className="notification-date text-date">{date}</p>
      </div>
      {path === 'notifications' && <div className='absolute top-0 right-0'>
        <img src={closeIcon} alt="close" />
      </div>}
    </div>
  )
}

export default NotificationCard
