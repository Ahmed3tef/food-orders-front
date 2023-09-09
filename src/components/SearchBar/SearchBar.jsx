import React, { useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import caretDown from '../../assets/images/dropdown-searchbar.svg'




const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const navHeight = document.querySelector('.nav')?.clientHeight;
  useEffect(() => {
    setNavbarHeight(navHeight);

  }, [navHeight])


  const navigate = useNavigate();

  const showDropdownHandler = () => {
    setShowSearchMenu(prevState => !prevState)
  }

  const handleSearchOnEnter = e => {
    if (e.keyCode === 13 && searchValue) {
      navigate(`product/search/${searchValue}`);
    }
  };




  return (
    <>
      <div className='w-7/12 hidden md:block' style={{
        marginInlineStart: '2rem'
      }}>
        <div className="search-bar flex space-x-8">
          <div className="search-bar__input">
            <div className="search-bar__input-text">
              <span
                className='text-searchIcon cursor-pointer'
                onClick={() => {
                  if (searchValue) navigate(`product/search/${searchValue}`);
                }}>
                <MdSearch />
              </span>
              <input
                placeholder='Search products, brands and categories...'

                type='text'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={handleSearchOnEnter}
                tabIndex='0'
              />

            </div>
            <div className="search-bar__input-menu" onClick={showDropdownHandler}>
              <img src={caretDown} alt="dropdown" />
            </div>
          </div>
          <button className='btn-search'>Search</button>
        </div>
      </div>
      <button className='flex justify-center items-center bg-white w-14 h-14 text-mainGrey  md:hidden rounded-full' style={{
        fontSize: '2.8rem'

      }}><MdSearch /></button>

      {showSearchMenu && <div className="search-options px-[2rem] py-[1rem]  left-[40%] absolute h-[30rem] bg-mainGrey shadow-lg z-10 rounded-b-xl" style={{
        top: navbarHeight
      }}>
        <div className="options-container mb-12">
          <h3 className='mb-[1.5rem]'>Search about</h3>
          <div className="option space-x-20 px-6">
            <label htmlFor="shop"><input type="radio" name="search about" id="shop" value={'shop'} lab /> Shop</label>
            <label htmlFor="product"><input type="radio" name="search about" id="product" value={'product'} />  product</label>
          </div>
        </div>
        <div className="options-container">
          <h3 className='mb-[1.5rem]'>Search by</h3>
          <div className="space-x-20 px-6 flex">
            <div className="options ">

              <label htmlFor="shopName">
                <input type="radio" name="shop search by" id="shopName" value={'shop name'} lab />
                Shop Name.
              </label>

              <label htmlFor="shopLocation">
                <input type="radio" name="shop search by" id="shopLocation" value={'shop location'} lab />
                Shop Location.
              </label>

              <label htmlFor="shopClassification">
                <input type="radio" name="shop search by" id="shopClassification" value={'shop'} lab />
                Shop Classification.
              </label>


            </div>
            <div className="options">

              <label htmlFor="productName">
                <input type="radio" name="product search by" id="productName" value={'shop'} lab />
                Product Name.
              </label>
              <label htmlFor="productSize">
                <input type="radio" name="product search by" id="productSize" value={'shop'} lab />
                Product Size.
              </label>
              <label htmlFor="productColor">
                <input type="radio" name="product search by" id="productColor" value={'shop'} lab />
                Product Color.
              </label>


            </div>

          </div>
        </div>
        <button className='bg-mainGreyLightest px-6 py-1  mt-[1.5rem] rounded-xl text-mainGrey transition-all duration-300 hover:scale-105 active:scale-95 ml-[45%]' onClick={showDropdownHandler}>ok</button>
      </div>}

    </>
  )
}

export default SearchBar
