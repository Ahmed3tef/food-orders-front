import React from 'react'
import Slider from 'react-slick';
import BannerCard from '../Cards/BannerCard';
import BannerShop from '../Cards/BannerShop';
import './_carrousel.scss'


const CarrouselContainer = ({ data, path }) => {


  const settings = {
    dots: path === 'home' ? false : true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    arrows: false
  };



  return (
    <div className={path === 'home' ? 'container-mx my-12' : 'mb-12'}>
      <Slider {...settings}>
        {path === 'home' && data && data.map((e, i) => <BannerCard key={i} data={e} />)}
        {path === 'shop' && data && data.map((e, i) => <BannerShop key={i} data={e} />)}
      </Slider>
    </div>
  )
}

export default CarrouselContainer


