import React from 'react'

const CartTotalTable = (props) => {

  const deliveryFee = 20;
  const ServiceFee = 20;
  const totalFinal = props.totalPrice + deliveryFee + ServiceFee;

  return (
    <div className="total-table">
      <div className="total-table--item">
        <span>Subtotal</span>
        <span className='currency'>
          <span >
            EGP
          </span>
          {props.totalPrice}
        </span>
      </div>


      <div className="total-table--item">
        <span>Delivery Fee</span>
        <span className='currency '>
          <span>
            EGP
          </span>
          {deliveryFee}
        </span>
      </div>



      <div className="total-table--item">
        <span>Service Fee </span>
        <span className='currency'>
          <span >
            EGP
          </span>
          {ServiceFee}
        </span>
      </div>

      <div className="total-table--item">
        <span>Total Amount</span>
        <span className='currency text-lightGreen'>
          <span >
            EGP
          </span>
          {totalFinal}
        </span>
      </div>

    </div>
  )
}

export default CartTotalTable
