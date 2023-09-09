import React from 'react'
import { AccountCard, PageNavigation } from '../components'
import { accountData } from '../utils/account-data'

const Account = () => {
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2={'Account'} />
      <div className='px-[4rem] font-Roboto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] md:gap-[3.5rem] lg:gap-[4.5rem] py-[4rem] lg:py-[8rem]'>
        {
          accountData.map((e, i) => <AccountCard data={e} key={i} />)
        }
      </div>
    </>
  )
}

export default Account
