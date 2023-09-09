import React, { useEffect, useState } from 'react'
import { ErrorCard, PageNavigation, ShopCart, Spinner } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInfo } from '../store/reducers/user/userInfo';

import locationIcon from '../assets/images/location-icon.svg'
import phoneIcon from '../assets/images/phone-icon.svg'

const Cart = () => {

  const dispatch = useDispatch()
  const { userInfo, isLoading, error } = useSelector(state => state.userInfo)

  const [address, setAddress] = useState()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(loadUserInfo())
  }, []);

  useEffect(() => {
    setAddress(userInfo && userInfo.addresses ? userInfo.addresses[0] : null)
  }, [userInfo]);

  // console.log(address);
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2={'Shopping Cart'} />

      {!isLoading && !error && userInfo && <div className="cart-page">
        <div className="cart-info">
          <div className="info-section">
            <div className="section-header">
              <h3>Add Product Choices</h3>
            </div>
            <div className="section-body">
              <h4>Select your shipping address</h4>
              <div className="addresses">
                {
                  userInfo.addresses?.map((e, i) => {
                    return <div className='address' key={i}>
                      <label htmlFor={i} key={i} onClick={() => setAddress(e)}>
                        <input type="radio" value={i} name={'price'} id={i} defaultChecked={i === 0 && true} />
                        <div className="option-text-container">
                          <div className="option-location">
                            <img src={locationIcon} className="option-icon" />
                            <span className="option-text">
                              {`${e.name} - ${e.streetName} - ${e.buildingNumber}`}
                            </span>

                          </div>

                          <div className="option-phone">
                            <img src={phoneIcon} className="option-icon" />
                            <span className="option-text">
                              {userInfo.phoneNumber}
                            </span>

                          </div>

                        </div>
                      </label>
                    </div>
                  })
                }


              </div>

            </div>
          </div>


          <div className="info-section">
            <div className="section-header">
              <h3>Payment Methods</h3>
            </div>
            <div className="section-body">
              <h4>How do you want to pay for your order?</h4>

              <div className='payment px-[2rem]'>
                <label htmlFor={'cash'}   >
                  <input type="radio" value={'cash'} name={'payment'} id={'cash'} defaultChecked />
                  <div className="option-text-container">
                    <span className="option-text">
                      Cash On Delivery.
                    </span>
                  </div>
                </label>
                <label htmlFor={'card'}   >
                  <input type="radio" value={'card'} name={'payment'} id={'card'} />
                  <div className="option-text-container">
                    <span className="option-text">
                      Credit Card.
                    </span>
                  </div>
                </label>
              </div>

            </div>
          </div>


          <div className="info-section">
            <div className="section-header">
              <h3>Delivery Instructions</h3>
            </div>
            <div className="section-body">
              <h4>Add your Delivery Instructions</h4>

              <div className=' px-[2rem]'>
                <textarea name="notes" id="notes" maxLength={500}></textarea>
              </div>

            </div>
          </div>


        </div>
        <ShopCart path='cart' userInfo={userInfo} address={address} />
      </div>}


      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorCard />}
    </>
  )
}

export default Cart
