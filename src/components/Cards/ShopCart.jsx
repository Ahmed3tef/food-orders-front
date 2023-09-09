import React from 'react'
import cartIcon from '../../assets/images/cart-item.svg'
import { useNavigate } from 'react-router-dom';
import { CartProduct, CartTotalTable } from '..';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APIBase } from '../../store/reducers/api';


const ShopCart = (props) => {


  const { items, totalPrice } = useSelector(state => state.cart);
  const finalPrice = Number(Math.round(totalPrice + 'e2') + 'e-2');



  const navigate = useNavigate()

  const SubmitHandler = () => {
    if (props.path === 'shop') navigate('/cart');

    if (props.path === 'cart') {
      // here submit order and navigate
      const mappedProducts = items.map(p => {
        return {
          id: p.id,
          quantity: p.quantity,
          variant: p.variant,
          extras: p.extras
        }
      })
      const reqData = {
        shop: localStorage.getItem('shopId'),
        area: props.userInfo?.area?.id,
        orderedBy: {
          fullName: `${props.userInfo?.name?.first} ${props.userInfo?.name?.last}`,
          email: props.userInfo?.email,
          phoneNumber: props.userInfo?.phoneNumber,
          address: props.address,
        },
        products: mappedProducts
      }
      console.log(reqData);

      axios.post(`${APIBase}api/orders/customers/place`, reqData, {

        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiYzBiNWI3MjIyNjk1ZTg5ZGVhMjQ0YzA2YTg1ZDY3MTFjOWMwOGY5ZjA4ODI1OGMxNjQ3MjUyNzNiNTYzMDQiLCJ0eXBlIjo2LCJpYXQiOjE2NzE4ODQ3OTAsImV4cCI6MTY3MjQ4OTU5MH0.HHk1EpVdO-1tTpC2k4IaTzIEjcgnnyOGq2ZJb7x6jUQ",
        }

      }).then(() => {
        localStorage.removeItem('cart')
        localStorage.removeItem('shopId')
        navigate('/orders');
      })

    }
  }

  return (
    <div className="cart ">
      <div className='cart-head'>Your Shopping Cart</div>
      {items.length === 0 && !finalPrice && <div className="cart-body body-empty">
        <img src={cartIcon} alt="cart icon" />
        <span>There isn't products in your shopping cart.</span>
      </div>}
      {items.length > 0 && finalPrice && <div className="cart-body body-full">
        {items.map((e, i) =>
          <CartProduct product={e} key={i} />
        )}
        <CartTotalTable totalPrice={finalPrice} />
        <div className="cart-cta">

          <button onClick={SubmitHandler} className='bg-lightGreen' >{props.path === 'cart' ? 'Submit' : 'Proceed to Checkout'}</button>
          {props.path === 'cart' && <button>Cancel</button>}

        </div>

      </div>}
    </div>
  )
}

export default ShopCart
