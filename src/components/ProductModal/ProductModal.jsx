
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import cartSvg from '../../assets/images/cart-btn-white.svg';
import closeModal from '../../assets/images/close-modal.svg';
import { cartActions } from '../../store/reducers/cart';
import Counter from '../Counter/Counter';



const ProductModal = ({ product, setShowModal }) => {
  const [count, setCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [variant, setVariant] = useState(product.variants[0]?.id);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch()

  const extrasHandler = (e, id) => {
    let resultArray = [];
    if (e.target.checked) {
      resultArray = extras.filter(CheckedId => CheckedId !== id);
      resultArray.push(id);
    } else {
      resultArray = extras.filter(CheckedId => CheckedId !== id);
    }
    setExtras(resultArray);
  };


  const addToCartHandler = () => {
    if (!variant) return // some toast with err msg;

    if (variant) {
      dispatch(cartActions.addProductToCart({
        product,
        extras,
        variant,
        quantity: count,
        price,
      }))
      setShowModal(false)

    }
  }



  return (
    <div className='modal-product'>
      <div className="overlay" onClick={() => setShowModal(false)}></div>
      <div className="modal">
        <div className="modal-section">
          <div className="section-header">


            <h3>Add Product Choices</h3>

            <img src={closeModal} alt="SDF" onClick={() => setShowModal(false)} />
          </div>
          <div className="section-body">
            <h4>{product.name}</h4>
            <div className="flex-center justify-between">
              <p className='max-w-[70%]'>{product.description}</p>
              <Counter count={count} setCount={setCount} />
            </div>

          </div>
        </div>
        <div className="modal-section">
          <div className="section-header">

            <h3>Your Choice Of Size</h3>

          </div>
          <div className="section-body">

            <div className="flex-center justify-around">
              {product.variants?.map((e, i) => (
                <label htmlFor={e.id} key={i} onClick={() => {
                  setVariant(e.id);
                  setPrice(e.discountPrice ? e.discountPrice : e.price)
                }}>
                  <input type="radio" value={e.id} name={'price'} id={e.id} defaultChecked={i === 0 && true} />
                  <span className="option-title">{e.name}</span>
                  <span className="option-text">
                    (EGP {e.discountPrice ? e.discountPrice : e.price})
                  </span>
                </label>
              ))}
            </div>

          </div>
        </div>
        <div className="modal-section">
          <div className="section-header">

            <h3>Extras</h3>

          </div>
          <div className="section-body">

            <div className="flex-center justify-around">
              {product.extras?.map((e, i) => (
                <label htmlFor={e.id} key={i} >
                  <input
                    type='checkbox'
                    name={e.name}
                    id={e.id}
                    value={e.id}
                    onChange={event => extrasHandler(event, e.id)}
                  />
                  <span className="option-title">{e.name}</span>
                  <span className="option-text">
                    (EGP {e.discPrice ? e.discPrice : e.price})
                  </span>
                </label>
              ))}
            </div>

          </div>
          <div className='w-full mb-[4rem]'>

            <button type='button' className='add' onClick={addToCartHandler}>
              <img src={cartSvg} alt="" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
