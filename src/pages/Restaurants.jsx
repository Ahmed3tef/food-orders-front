import React, { useEffect, useState } from 'react';

import { ErrorCard, HomeSectionLayout, PageNavigation, Pagination, SaleProductCard, Spinner } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { loadRestaurant_P } from '../store/reducers/view-more/restaurant-products';



const Restaurants = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)

  const restaurants_P = useSelector(
    (state) => state.restaurants_P.restaurant_P
  );
  const restaurants_PError = useSelector((state) => state.restaurants_P.error);
  const restaurants_PIsLoading = useSelector(
    (state) => state.restaurants_P.isLoading
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadRestaurant_P({ page: currentPage }));
  }, [currentPage]);
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2='Restaurants' />
      {!restaurants_PIsLoading && !restaurants_PError && restaurants_P &&
        <>
          <HomeSectionLayout>
            {restaurants_P.products?.map((e, i) => {
              return <SaleProductCard key={i} data={e} type={'shop'} />;
            })}
          </HomeSectionLayout>
          {restaurants_P && restaurants_P.totalCount && restaurants_P.perPageCount && <Pagination totalCount={restaurants_P.totalCount} perPageCount={restaurants_P.perPageCount} setPage={setCurrentPage} currentPage={currentPage} />}
        </>
      }
      {restaurants_PIsLoading && !restaurants_PError && <Spinner />}
      {!restaurants_PIsLoading && restaurants_PError && <ErrorCard />}
    </>
  )
}

export default Restaurants
