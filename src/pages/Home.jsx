import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  ErrorCard,
  FlashCountDown,
  Header,
  HomeSectionLayout,
  HomeSectionTitle,
  SaleCategoryCard,
  SaleProductCard,
  Spinner,
} from '../components';

import { loadFlashSale_P } from '../store/reducers/Home/flash-sale';
import { loadAds } from '../store/reducers/Home/ads';
import { loadSupermarket_P } from '../store/reducers/Home/supermarket';
import { loadRestaurants } from '../store/reducers/Home/restaurants';
import { loadRestaurantsPopular } from '../store/reducers/Home/popular-restaurants';

const Home = () => {
  const dispatch = useDispatch();

  const ads = useSelector((state) => state.ads.ads);
  const adsError = useSelector((state) => state.ads.error);
  const adsIsLoading = useSelector((state) => state.ads.isLoading);

  const supermarket_P = useSelector(
    (state) => state.supermarket_P.supermarket_P
  );
  const supermarket_PError = useSelector((state) => state.supermarket_P.error);
  const supermarket_PIsLoading = useSelector(
    (state) => state.supermarket_P.isLoading
  );

  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const restaurantsError = useSelector((state) => state.restaurants.error);
  const restaurantsIsLoading = useSelector(
    (state) => state.restaurants.isLoading
  );

  const restaurantsPopular = useSelector(
    (state) => state.restaurantsPopular.restaurantsPopular
  );
  const restaurantsPopularError = useSelector(
    (state) => state.restaurantsPopular.error
  );
  const restaurantsPopularIsLoading = useSelector(
    (state) => state.restaurantsPopular.isLoading
  );

  const flashSaleHome = useSelector((state) => state.flashSaleHome.flashSale_P);
  const flashExpiresAt = useSelector(
    (state) => state.flashSaleHome.flashSaleExpiresAt
  );
  const flashSaleId = useSelector((state) => state.flashSaleHome.flashSaleId);
  const flashSaleHomeError = useSelector((state) => state.flashSaleHome.error);
  const flashSaleHomeIsLoading = useSelector(
    (state) => state.flashSaleHome.isLoading
  );

  useEffect(() => {
    dispatch(loadAds());
    dispatch(loadFlashSale_P());
    dispatch(loadSupermarket_P());
    dispatch(loadRestaurants());
    dispatch(loadRestaurantsPopular());
  }, []);

  return (
    <>
      {!adsIsLoading && ads.length > 0 && <Header data={ads} path="home" />}
      {adsIsLoading && <Spinner />}
      {adsError && <ErrorCard />}

      {!supermarket_PIsLoading && supermarket_P.length > 0 && (
        <div className="my-6">
          <HomeSectionTitle
            title="Supermarket New Arrivals"
            path={'/supermarket'}
          />
          <HomeSectionLayout>
            {supermarket_P.map((e, i) => {
              return <SaleProductCard key={i} data={e} />;
            })}
          </HomeSectionLayout>
        </div>
      )}

      {supermarket_PIsLoading && <Spinner />}
      {!supermarket_PIsLoading && supermarket_PError && <ErrorCard />}

      {!restaurantsIsLoading && !restaurantsError && restaurants && (
        <div className="my-6">
          <HomeSectionTitle
            title="Restaurants New Arrivals"
            path={'/restaurants'}
          />
          <HomeSectionLayout>
            {restaurants.map((e, i) => {
              return <SaleProductCard key={i} data={e} />;
            })}
          </HomeSectionLayout>
        </div>
      )}

      {restaurantsIsLoading && <Spinner />}
      {!restaurantsIsLoading && restaurantsError && <ErrorCard />}

      {!restaurantsPopularIsLoading &&
        !restaurantsPopularError &&
        restaurantsPopular.length > 0 && (
          <div className="my-6">
            <HomeSectionTitle
              title="Most Popular Restaurants"
              path={'/restaurants/popular'}
            />
            <HomeSectionLayout>
              {restaurantsPopular.map((e, i) => {
                return <SaleCategoryCard key={i} data={e} type={'shop'} />;
              })}
            </HomeSectionLayout>
          </div>
        )}

      {restaurantsPopularIsLoading && <Spinner />}
      {!restaurantsPopularIsLoading && restaurantsPopularError && <ErrorCard />}

      {!flashSaleHomeIsLoading && flashSaleHome && flashSaleHome.length > 0 && (
        <div className="my-6">
          <HomeSectionTitle title="Flash Sale" path={`/flash/${flashSaleId}`} />
          <FlashCountDown date={flashExpiresAt} />
          <HomeSectionLayout>
            {flashSaleHome.map((e, i) => {
              return <SaleProductCard key={i} type="progress" data={e} />;
            })}
          </HomeSectionLayout>
        </div>
      )}

      {flashSaleHomeIsLoading && <Spinner />}
      {flashSaleHomeError && <ErrorCard />}
    </>
  );
};

export default Home;
