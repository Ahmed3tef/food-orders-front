import React from 'react'
import plusIcon from '../../assets/images/plus icon.svg';


// { product, setShowModal, setModalProduct }
const ShopProductCard = (props) => {

  const addProductHandler = () => {

    props.setModalProduct(props.product)
    props.setShowModal(true)
  }

  return (
    <div className="product-card">
      <div className="product-text">
        <div className="product-title">
          {props.product.name}
        </div>
        <div className="product-desc">
          {props.product.description}
        </div>
        <div className="product-foot">
          <span className="product-price">
            EGP
            <span className='price'>
              {props.product.price}
            </span>
          </span>
          <img src={plusIcon} alt="add product icon" className='cursor-pointer' onClick={addProductHandler} />
        </div>

      </div>
      <div className="product-img">
        <img src={props.product.image} alt={props.product.name} />
      </div>

    </div>
  )
}

export default ShopProductCard
