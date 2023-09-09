import React from 'react'
import { useCountdown } from './useCountdown'

const CountdownTimer = () => {
  const flashSaleEnds = new Date('2022-12-10T13:33:41.845Z').getTime()
  const [days, hours, minutes, seconds] = useCountdown(flashSaleEnds);
  console.log(days, hours, minutes, seconds);
  return (
    <div>CountdownTimer</div>
  )
}

export default CountdownTimer
