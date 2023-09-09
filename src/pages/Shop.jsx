import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  CarrouselContainer,
  CategorySectionTitle,
  ErrorCard,
  PageNavigation,
  ProductModal,
  Ratings,
  ShopCart,
  Spinner,
} from '../components';
import { loadShopBestOffers } from '../store/reducers/shop/shopBestOffers';
import { loadShopData } from '../store/reducers/shop/shopData';
import { loadShopInfo } from '../store/reducers/shop/shopInfo';
import { loadShopMostSelling } from '../store/reducers/shop/shopMostSelling';
import { loadShopReviews } from '../store/reducers/shop/shopReviews';

import cashIcon from '../assets/images/cash.svg';
import visaIcon from '../assets/images/visa.svg';

import greenStarIcon from '../assets/images/green-star.svg';

const Shop = () => {
  const dispatch = useDispatch();

  // modal
  const [showModal, setShowModal] = useState(false)
  const [modalProduct, setModalProduct] = useState(false)

  const params = useParams();
  const shopId = params.id;

  const [shownSection, setShownSection] = useState('about');

  const shopBestOffers = useSelector(
    (state) => state.shopBestOffers.shopBestOffers
  );
  const shopBestOffersIsLoading = useSelector(
    (state) => state.shopBestOffers.isLoading
  );
  const shopBestOffersError = useSelector(
    (state) => state.shopBestOffers.error
  );

  const shopMostSelling = useSelector(
    (state) => state.shopMostSelling.shopMostSelling
  );
  const shopMostSellingIsLoading = useSelector(
    (state) => state.shopMostSelling.isLoading
  );
  const shopMostSellingError = useSelector(
    (state) => state.shopMostSelling.error
  );

  const shopInfo = useSelector((state) => state.shopInfo.shopInfo);
  const shopInfoIsLoading = useSelector((state) => state.shopInfo.isLoading);
  const shopInfoError = useSelector((state) => state.shopInfo.error);

  const shopData = useSelector((state) => state.shopData.shopData);
  const shopDataIsLoading = useSelector((state) => state.shopData.isLoading);
  const shopDataError = useSelector((state) => state.shopData.error);

  const shopReviews = useSelector((state) => state.shopReviews.shopReviews);
  const shopReviewsIsLoading = useSelector(
    (state) => state.shopReviews.isLoading
  );
  const shopReviewsError = useSelector((state) => state.shopReviews.error);


  const existingShop = localStorage.getItem('shopId')

  const handleClick = (event, path) => {
    // remove active and add to clicked nav
    const navButtons = document.querySelectorAll('.shop-nav-link');
    navButtons.forEach((btn) => btn.classList.remove('active-shop-nav'));
    event.target.classList.add('active-shop-nav');

    // show clicked section

    setShownSection(path);
  };

  useEffect(() => {
    dispatch(loadShopData(shopId));
    dispatch(loadShopInfo(shopId));
    dispatch(loadShopBestOffers(shopId));
    dispatch(loadShopMostSelling(shopId));
    dispatch(loadShopReviews(shopId));
    // dispatch(loadShopSectionData({ shopId, sectionId:'' }))
  }, [shopId]);

  useEffect(() => {
    if (existingShop !== shopId) {
      localStorage.setItem('shopId', shopId)
      localStorage.removeItem('cart')
    }
  }, [])


  return (
    <div className='relative'>
      {modalProduct && showModal && <ProductModal product={modalProduct} setShowModal={setShowModal} />}
      {shopInfo && shopInfo.category && (
        <PageNavigation
          title1="Home"
          path1="/"
          title2={shopInfo.category?.name}
          path2={`/category/${shopInfo.category?.id}`}
          title3={shopInfo.name}
        />
      )}
      <div className="font-bold container-mx font-Roboto">
        {!shopDataIsLoading && !shopDataError && shopData && (
          <CarrouselContainer path="shop" data={shopData.banners} />
        )}
        {shopDataIsLoading && <Spinner />}
        {shopDataError && <ErrorCard />}

        {shopInfo.name && <CategorySectionTitle title={shopInfo.name} />}

        {!shopReviewsError && !shopReviewsIsLoading && shopReviews && (
          <div className="flex justify-between px-4 lg:px-10 mt-[1.2rem] mb-[5rem]">
            <div className="text-[2.4rem] max-w-[40%] overflow-hidden">
              {shopData.description}
            </div>
            <div className="text-[2rem] flex items-center space-x-4">
              <Ratings color={'#207D66'} value={shopReviews.avgReview ?? 0} />
              <div>({shopReviews.reviewsCount ?? 0} Reviews)</div>
            </div>
          </div>
        )}
        {shopReviewsIsLoading && <Spinner />}

        <ul className="shop-nav">
          <li
            className="shop-nav-link active-shop-nav"
            onClick={(e) => handleClick(e, 'about')}
          >
            ABOUT
          </li>
          <li
            className="shop-nav-link"
            onClick={(e) => handleClick(e, 'sections')}
          >
            SECTIONS
          </li>
          <li className="shop-nav-link" onClick={(e) => handleClick(e, 'rate')}>
            RATE & REVIEWS
          </li>
        </ul>

        {!shopInfoIsLoading &&
          !shopInfoError &&
          shownSection === 'about' &&
          shopInfo && (
            <div className="mx-[4%] space-x-[2rem] lg:space-x-[4rem] flex">
              <div className="flex-1 border-2 h-fit rounded-lg p-[1rem]">
                <div className="about-item">
                  <span>Shop Status</span>
                  <span>Opened</span>
                </div>
                <div className="about-item">
                  <span>Opening Days</span>
                  <span>{`${shopInfo.startDay} - ${shopInfo.endDay}`}</span>
                </div>
                <div className="about-item">
                  <span>Opening Hours</span>
                  <span>{shopInfo.hours}</span>
                </div>
                <div className="about-item">
                  <span>Minimum Order</span>
                  <span>{shopInfo.minOrderValue}</span>
                </div>
                <div className="about-item">
                  <span>Payment Methods</span>
                  <span className="flex space-x-4">
                    <img src={cashIcon} alt="cashIcon" className="w-[3rem]" />
                    <img src={visaIcon} className="w-[3rem]" alt="visaIcon" />
                  </span>
                </div>
                <div className="about-item">
                  <span>Delivery Time</span>
                  <span>{shopInfo.deliveryTime}</span>
                </div>
              </div>

              {/* cart */}
              <ShopCart path='shop' />
            </div>
          )}

        {/* sections */}
        {!shopDataIsLoading &&
          !shopDataError &&
          shopData &&
          shownSection === 'sections' && (
            <div className="mx-[4%] space-x-[2rem] lg:space-x-[4rem] flex">
              <div className="flex-1 h-fit rounded-lg flex flex-col gap-[2rem] ">
                {shopMostSellingIsLoading && <Spinner />}
                {!shopMostSellingIsLoading && shopMostSellingError && (
                  <ErrorCard />
                )}
                {!shopMostSellingIsLoading &&
                  !shopMostSellingError &&
                  shopMostSelling && (
                    <Accordion
                      title="Most Selling"
                      shopId={shopId}
                      data={shopMostSelling}
                      setModalProduct={setModalProduct}
                      setShowModal={setShowModal}
                    />
                  )}

                {shopBestOffersIsLoading && <Spinner />}
                {!shopBestOffersIsLoading && shopBestOffersError && (
                  <ErrorCard />
                )}
                {!shopBestOffersIsLoading &&
                  !shopBestOffersError &&
                  shopBestOffers && (
                    <Accordion
                      title="Best Offers"
                      shopId={shopId}
                      data={shopBestOffers}
                      setModalProduct={setModalProduct}
                      setShowModal={setShowModal}
                    />
                  )}

                {shopData.sections?.map((e, i) => (
                  <Accordion key={i} title={e.name} id={e.id} shopId={shopId} setModalProduct={setModalProduct} setShowModal={setShowModal} />
                ))}
              </div>
              <ShopCart />
            </div>
          )}

        {/* reviews */}

        {!shopReviewsIsLoading &&
          !shopReviewsError &&
          shownSection === 'rate' &&
          shopInfo && (
            <div className="mx-[4%] space-x-[2rem] lg:space-x-[4rem] flex">
              <div className="flex-1">
                <CategorySectionTitle title="General Reviews" />

                <div className="flex-1 border-2 h-fit rounded-lg p-[1rem] mb-[3rem] mt-[1.5rem]">
                  <div className="about-item">
                    <span>Number of reviews</span>
                    <span>{shopReviews.reviewsCount}</span>
                  </div>
                  <div className="about-item">
                    <span>Average review</span>
                    <span>{shopReviews.avgReview}</span>
                  </div>
                  <div className="about-item">
                    <span>Orders</span>
                    <span>{shopReviews.orders}</span>
                  </div>
                  <div className="about-item">
                    <span>Offers</span>
                    <span>{shopReviews.offers}</span>
                  </div>
                </div>

                <CategorySectionTitle title="Reviews" />
                <div className="w-full border-2 h-fit rounded-lg p-[1rem] mt-[1.5rem]">
                  {shopReviews.reviews.map((e, i) => {
                    return (
                      <div
                        className="about-item flex-col items-start gap-[1.5rem]"
                        key={i}
                      >
                        <p className="flex gap-[.5rem] items-center text-darkGreen text-base">
                          <img src={greenStarIcon} alt="" />
                          <span>{e.rating}</span>
                        </p>
                        <p className="px-[2rem]">{e.text}</p>
                        <p className="flex text-black gap-[2rem] items-center">
                          <span>{e.name},</span>
                          <span>
                            {new Date(e.date).toLocaleString('de-DE', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* cart */}
              <ShopCart path='shop' />
            </div>
          )}
      </div>
    </div>
  );
};

export default Shop;
