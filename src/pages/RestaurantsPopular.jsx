import React, {useEffect, useState} from 'react';

import {
  ErrorCard,
  HomeSectionLayout,
  PageNavigation,
  Pagination,
  SaleCategoryCard,
  Spinner
} from '../components'
import {useDispatch, useSelector} from 'react-redux';

import {loadRestaurantsPopular} from '../store/reducers/view-more/restaurants';


const RestaurantsPopular = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const restaurantsPopular = useSelector(
    (state) => state.restaurantsMorePopular.restaurantsPopular
  );
  const restaurantsPopularError = useSelector((state) => state.restaurantsMorePopular.error);
  const restaurantsPopularIsLoading = useSelector(
    (state) => state.restaurantsMorePopular.isLoading
  );

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    dispatch(loadRestaurantsPopular({page: currentPage}));
  }, [currentPage]);

  return (
    <>
      <PageNavigation title1='Home' path1='/' title2='Popular Restaurants'/>
      {!restaurantsPopularIsLoading && !restaurantsPopularError && restaurantsPopular &&
        <>
          <HomeSectionLayout>
            {restaurantsPopular.shops?.map((e, i) => <SaleCategoryCard key={i}
                                                                       data={e}
                                                                       type={'shop'}/>
            )}
          </HomeSectionLayout>
          {restaurantsPopular && restaurantsPopular.totalCount && restaurantsPopular.perPageCount &&
            <Pagination totalCount={restaurantsPopular.totalCount}
                        perPageCount={restaurantsPopular.perPageCount}
                        setPage={setCurrentPage} currentPage={currentPage}/>}
        </>
      }
      {restaurantsPopularIsLoading && !restaurantsPopularError && <Spinner/>}
      {!restaurantsPopularIsLoading && restaurantsPopularError && <ErrorCard/>}
    </>
  )
}

export default RestaurantsPopular;





