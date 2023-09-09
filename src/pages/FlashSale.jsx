import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ErrorCard, FlashCountDown, HomeSectionLayout, SaleProductCard, Spinner } from '../components'
import { useParams } from 'react-router-dom'
import { loadFlashSale } from '../store/reducers/flash-sale'

const FlashSale = () => {
  const id = useParams().id

  const dispatch = useDispatch();

  const flashSale = useSelector(state => state.flashSale.flashSaleData)

  const flashSaleError = useSelector(state => state.flashSale.error)
  const flashSaleIsLoading = useSelector(state => state.flashSale.isLoading)


  const [allFlashSaleData, setAllFlashSaleData] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(loadFlashSale({ id, page: 1 }))
  }, [id])

  // load on scroll pagination

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight
    const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
    if (currentHeight + 1 >= scrollHeight) setPage(prev => prev + 1)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (flashSale && flashSale.totalCount === flashSale.perPageCount && flashSale.products) {

      setAllFlashSaleData(prev => [...prev, ...flashSale.products])
    }
    return window.removeEventListener('scroll', handleScroll)
  }, [flashSale])




  useEffect(() => {
    if (page > 1)
      dispatch(loadFlashSale({ id, page })).then(() => {

      })
    if (page === 1 && flashSale && flashSale.products && allFlashSaleData.length === 0) {
      setAllFlashSaleData(flashSale.products)
    }
  }, [page, flashSale])




  return (
    <>

      {flashSaleIsLoading && <Spinner />}
      {!flashSaleIsLoading && flashSaleError && <ErrorCard />}
      {!flashSaleIsLoading && !flashSaleError && flashSale && <div className='my-6'>

        <FlashCountDown date={flashSale.expiresAt} />
        {allFlashSaleData && <HomeSectionLayout>
          {allFlashSaleData.map((e, i) => {

            return <SaleProductCard key={i} type='progress' data={e} />
          })}
        </HomeSectionLayout>}

      </div>}
    </>
  )
}

export default FlashSale
