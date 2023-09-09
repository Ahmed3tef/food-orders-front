import React, { useEffect, useState } from 'react';

import { ErrorCard, HomeSectionLayout, PageNavigation, Pagination, SaleProductCard, Spinner } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { loadSupermarket } from '../store/reducers/view-more/super-market';


const Supermarket = () => {


  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)

  const supermarket = useSelector(
    (state) => state.supermarket.supermarket
  );
  const supermarketError = useSelector((state) => state.supermarket.error);
  const supermarketIsLoading = useSelector(
    (state) => state.supermarket.isLoading
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadSupermarket({ page: currentPage }));
  }, [currentPage]);
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2='Supermarket' />
      {!supermarketIsLoading && !supermarketError && supermarket &&
        <>
          <HomeSectionLayout>
            {supermarket.products?.map((e, i) => {
              return <SaleProductCard key={i} data={e} type={'shop'} />;
            })}
          </HomeSectionLayout>
          {supermarket && supermarket.totalCount && supermarket.perPageCount && <Pagination totalCount={supermarket.totalCount} perPageCount={supermarket.perPageCount} setPage={setCurrentPage} currentPage={currentPage} />}
        </>
      }
      {supermarketIsLoading && !supermarketError && <Spinner />}
      {!supermarketIsLoading && supermarketError && <ErrorCard />}
    </>
  )
}

export default Supermarket
