import { configureStore } from "@reduxjs/toolkit";
import {
  // home reducers
  ads,
  flashSaleHome,
  supermarket_P,
  restaurantsPopular,
  restaurants,
  // sidebar
  sidebarCategories,
  // categories
  categories,
  catPopularShops,
  catAllShops,
  catInfo,
  catShopsWithOffers,
  shopData,
  shopInfo,
  shopBestOffers,
  shopMostSelling,
  shopReviews,
  shopSectionData,
  flashSale,

  // view-more
  restaurantsMorePopular,
  restaurants_P,
  supermarket,

  // user
  userInfo,

  // orders
  historyOrders,
  currentOrders,

  // cart
  cart,
  // areas
  areas,
} from "./reducers";

export const store = configureStore({
  reducer: {
    // home reducers
    ads,
    supermarket_P,
    restaurantsPopular,
    restaurants,
    flashSaleHome,

    // sidebar

    sidebarCategories,
    //category reducers
    categories,
    catPopularShops,
    catAllShops,
    catShopsWithOffers,
    catInfo,
    // shop reducers
    shopData,
    shopInfo,
    shopBestOffers,
    shopMostSelling,
    shopReviews,
    shopSectionData,
    // flash sale
    flashSale,
    // view-more
    restaurantsMorePopular,
    restaurants_P,
    supermarket,

    //user
    userInfo,

    // orders
    historyOrders,
    currentOrders,

    // cart
    cart,

    //areas
    areas,
  },
});
