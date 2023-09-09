import React from 'react';
import {Navigate, Route, Routes} from 'react-router';
import {Footer, Navbar} from './components';
import {
  About,
  Account,
  Cart,
  Categories,
  Category,
  FlashSale,
  Home,
  Login,
  Notification,
  Orders,
  Policy,
  Register,
  Restaurants,
  RestaurantsPopular,
  Shipping,
  Shop,
  Supermarket,
  Terms
} from './pages';

import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/category/:id' element={<Category/>}/>
          <Route path='/shop/:id' element={<Shop/>}/>
          <Route path='/flash/:id' element={<FlashSale/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/privacy-policy' element={<Policy/>}/>
          <Route path='/delivery-policy' element={<Shipping/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/notifications' element={<Notification/>}/>
          <Route path='/supermarket' element={<Supermarket/>}/>
          <Route path='/restaurants' element={<Restaurants/>}/>
          <Route path='/restaurants/popular' element={<RestaurantsPopular/>}/>

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>


          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<Orders/>}/>


          {/* route doesn't match */}
          <Route path='/*' element={<Navigate to={'/'}/>}/>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </main>
      <Footer/>
    </>
  )
}

export default App
