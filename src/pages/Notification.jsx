import React from 'react'
import { PageNavigation, NotificationCard } from '../components'
import hm from '../assets/images/hm.webp';

const Notification = () => {
  const notificationEl = {
    title: 'H & M in Clothes Category added an offers on some products.',
    date: new Date('2022-11-01T11:26:43.098Z'),
    image: hm,
  }
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2={'Notifications'} />
      <div className="notifications">
        {
          [...new Array(12)].map((e, i) => <NotificationCard title={notificationEl.title} image={notificationEl.image} date={notificationEl.date.toLocaleString('en-UK', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            hour12: true,
            minute: '2-digit',
          })}
            path={'notifications'}
            key={i}
          />)
        }
      </div>
    </>
  )
}

export default Notification
