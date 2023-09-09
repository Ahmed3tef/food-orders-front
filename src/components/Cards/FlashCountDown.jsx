import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import flashImg from '../../assets/images/flashSale.png';

import { loadFlashSale_P } from '../../store/reducers/Home/flash-sale';

const FlashCountDown = ({ date }) => {

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date(date).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer

        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours.toString().padStart(2, '0'));
        setTimerMinutes(minutes.toString().padStart(2, '0'));
        setTimerSeconds(seconds.toString().padStart(2, '0'));
      }
    });
  };

  useEffect(() => {
    if (date) startTimer();
  }, [date]);

  return (
    <>

      {timerDays && <div className="container-mx flex justify-center my-20">

        <div className='w-[55rem] h-[25rem] lg:w-[45vw] lg:h-[18vw] bg-[#19AAAC] flex rounded-2xl overflow-hidden border-2 border-[#19AAAC]'>
          <div className="image-container w-[40%] rounded-l-2xl" >
            <img src={flashImg} alt="flash sale" className='image-cover rounded-l-2xl' />
          </div>
          <div className="flex-1 flex items-center justify-center space-x-6 xl:space-x-12" >
            <div className="flex flex-col text-white font-bold font-Roboto italic text-[1.8rem] xl:text-[2.5rem] items-center space-y-3">
              <span>Days</span>
              <span className='bg-white not-italic text-[#0F3D3E] w-fit  px-4 pl-4 py-2'>{timerDays} </span>
            </div>
            <div className="flex flex-col text-white font-bold font-Roboto italic text-[1.8rem] xl:text-[2.5rem]  items-center space-y-3">
              <span>Hours</span>
              <span className='bg-white not-italic tracking-[.5rem]	 text-[#0F3D3E] w-fit px-2 pl-4 py-2'>{timerHours} </span>
            </div>
            <div className="flex flex-col text-white font-bold font-Roboto italic text-[1.8rem] xl:text-[2.5rem]  items-center space-y-3">
              <span>Minutes</span>
              <span className='bg-white not-italic tracking-[.5rem]	 text-[#0F3D3E] w-fit px-2 pl-4 py-2'>{timerMinutes}</span>
            </div>
            <div className="flex flex-col text-white font-bold font-Roboto italic text-[1.8rem] xl:text-[2.5rem]  items-center space-y-3">
              <span>Seconds</span>
              <span className='bg-white not-italic tracking-[.5rem]	 text-[#0F3D3E] w-fit px-2 pl-4 py-2'>{timerSeconds}</span>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default FlashCountDown
