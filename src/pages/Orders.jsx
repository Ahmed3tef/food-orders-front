import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ErrorCard, OrdersHistory, PageNavigation, Spinner } from '../components';
import { loadCurrentOrders } from '../store/reducers/orders/current';

const Orders = () => {
  const dispatch = useDispatch()
  const { currentOrders, isLoading, error } = useSelector(state => state.currentOrders)


  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch(loadCurrentOrders())

  }, []);

  // console.log(currentOrders);
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2={'My Orders'} />

      {!isLoading && !error && currentOrders &&
        <div className="cart-page">
          <div className="cart-info">
            <div className="info-section">
              <div className="section-header">
                <h3>Current Orders</h3>
              </div>
              <div className="section-body flex flex-col gap-[3rem]">
                {currentOrders.map((e, i) => {
                  return <div className="order" key={i}>
                    <div className="order-head">
                      Order Receipted
                    </div>

                    <div className="order-body">
                      <div className="order-products">

                        {e.products?.map((p, i) =>
                          <div className="order-product" key={i}>
                            <img src={p.photoUrl} alt={p.name} />
                            <span className="name">{p.name}</span>
                            <span className="price">
                              <span className="currency">EGP</span>
                              <span>{p.totalPrice}</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="order-shop">{e.shop?.name}</div>
                    </div>

                  </div>
                })}
              </div>
            </div>
          </div>
          <OrdersHistory />
        </div>
      }


      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorCard />}
      {!isLoading && !error && !currentOrders && <h1>No orders yet.</h1>}
    </>
  )
}

export default Orders
