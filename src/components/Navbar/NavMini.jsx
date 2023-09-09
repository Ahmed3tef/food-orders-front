import React from 'react'
import { Link } from 'react-router-dom'
import englishFlag from '../../assets/images/Flag.svg';
import egyptFlag from '../../assets/images/Egypt Flag.svg';
import brand from '../../assets/images/lacost.png';

const NavMini = () => {
  return (
    <div className="flex justify-between items-center py-4 px-10 md:px-24 bg-black">
      <Link to='/'>Sell on orders</Link>
      <div className="flex space-x-12">
        {[1, 2, 3].map((e, i) => <div key={i} className="nav__mini-brand  p-2 flex justify-center items-center rounded-lg	cursor-pointer bg-brandBg">
          <img src={brand} alt="brand" key={i} />
        </div>)}
      </div>
      <div className="flex space-x-10 lg:space-x-32">
        <span className="flex space-x-4 cursor-pointer transition-all duration-300 hover:text-slate-400">
          <img src={englishFlag} alt="english" />
          <span>English</span>
        </span>
        <span className="flex space-x-4 cursor-pointer transition-all duration-300 hover:text-slate-400"><img src={egyptFlag} alt="arabic" />
          <span>عربي</span>
        </span>
      </div>
    </div>
  )
}

export default NavMini
