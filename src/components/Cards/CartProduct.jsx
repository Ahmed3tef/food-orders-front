import React, { useState } from 'react'
import Counter from '../Counter/Counter'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/reducers/cart'

const CartProduct = ({ product }) => {
  const [productCount, setProductCount] = useState(product?.quantity)

  const dispatch = useDispatch();
  const { increaseProductNumber, decreaseProductNumber } = cartActions

  const decreaseHandler = () => {
    dispatch(decreaseProductNumber(product?.id))
    setProductCount(prev => prev - 1)
  }
  const increaseHandler = () => {
    dispatch(increaseProductNumber(product?.id))
    setProductCount(prev => prev + 1)
  }

  return (
    <div className="cart-product">
      <h3 className="title">{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="size">
        <div className="text">
          <span className="title">Size</span>
          <span className="desc">Large</span>
        </div>
        <div className="count">
          <Counter count={productCount} path='cart' decreaseHandler={decreaseHandler} increaseHandler={increaseHandler} />
          {/* <div className="counter">
            <span>+</span>
            <span>1</span>
            <span>-</span>
          </div> */}
          <div className="price">
            <span className="text-lightGreen">
              EGP
            </span>
            {product.price}</div>
        </div>
      </div>
      {false && <div className="extras">
        <span className="title">Penne Pasta</span>
        <span className="title">White Souce</span>

      </div>}
      {false && <div className="notes">
        <h4 className="title">Special Request</h4>
        <p className="desc">Slow cooked lamb mouza covered with </p></div>}
    </div>
  )
}

export default CartProduct
