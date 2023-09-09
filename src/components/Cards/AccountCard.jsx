import React from 'react'

const AccountCard = ({ data }) => {
  return (
    <div className='account-card'>
      <div className="account-card__icon">
        <img src={data.icon} alt="" />
      </div>
      <div className="account-card__text">
        <h4>{data.title}</h4>
        <p>{data.text}</p>
      </div>
    </div>
  )
}

export default AccountCard
