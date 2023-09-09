import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CategorySectionTitle, ErrorCard, HomeSectionLayout, HomeSectionTitle, PageNavigation, PopularNearest, RestaurantCard, SaleCategoryCard, Spinner } from '../components'
import { loadAllShops } from '../store/reducers/category/all'
import { loadCatInfo } from '../store/reducers/category/catInfo'
import { loadCatShopsWithOffers } from '../store/reducers/category/offers'
import { loadCatPopularShops } from '../store/reducers/category/popular'

const Category = () => {
  const dispatch = useDispatch();
  const listInnerRef = useRef();
  const params = useParams()
  const id = params.id



  const catInfo = useSelector(state => state.catInfo.catInfo)

  const catPopularShops = useSelector(state => state.catPopularShops.catPopularShops)
  const catPopularShopsError = useSelector(state => state.catPopularShops.error)
  const catPopularShopsIsLoading = useSelector(state => state.catPopularShops.isLoading)

  const catShopsWithOffers = useSelector(state => state.catShopsWithOffers.catShopsWithOffers)
  const catShopsWithOffersError = useSelector(state => state.catShopsWithOffers.error)
  const catShopsWithOffersIsLoading = useSelector(state => state.catShopsWithOffers.isLoading)

  const catAllShops = useSelector(state => state.catAllShops.catAllShops)
  const catAllShopsError = useSelector(state => state.catAllShops.error)
  const catAllShopsIsLoading = useSelector(state => state.catAllShops.isLoading)

  const [allShopsData, setAllShopsData] = useState(catAllShops ? catAllShops : []);
  const [page, setPage] = useState(1)


  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight
    const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
    if (currentHeight + 1 >= scrollHeight) setPage(prev => prev + 1)
  }


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    dispatch(loadAllShops({ id, page: 1 }))
    dispatch(loadCatShopsWithOffers(id))
    dispatch(loadCatInfo(id))
    dispatch(loadCatPopularShops({ id, lat: 30, long: 30 }))

  }, [id])

  // load on scroll pagination
  useEffect(() => {
    if (catAllShops && catAllShops.totalCount === catAllShops.perPageCount) {
      window.addEventListener('scroll', handleScroll);
    }
    return window.removeEventListener('scroll', handleScroll)
  }, [catAllShops])




  useEffect(() => {
    if (page > 1)
      dispatch(loadAllShops({ id, page })).then(() => {

        setAllShopsData(prev => [...prev, ...catAllShops])
        console.log('ksdmflksmdfldskfm');
      })
    if (page === 1 && catAllShops && allShopsData.length === 0) {
      setAllShopsData(catAllShops)
    }
  }, [page, catAllShops])



  return (
    <>
      {catInfo && <PageNavigation title1='Home' path1='/' title2={catInfo.name || 'Restaurant'} />}
      <div className='container-mx my-[2rem]' ref={listInnerRef} onScroll={handleScroll}>

        {!catShopsWithOffersIsLoading && !catShopsWithOffersError && catShopsWithOffers && <>
          {catInfo && <CategorySectionTitle title={`${catInfo.name || 'Restaurant'} Offers`} />}
          <HomeSectionLayout>
            {catShopsWithOffers.map((e, i) => {

              return <RestaurantCard key={i} data={e} />
            })}
          </HomeSectionLayout>
        </>}
        {catShopsWithOffersIsLoading && <Spinner />}
        {catShopsWithOffersError && <ErrorCard />}


        {!catPopularShopsIsLoading && !catPopularShopsError && catPopularShops && <>
          {catInfo && <CategorySectionTitle title={`Popular ${catInfo.name || 'Restaurant'} near you`} />}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-5 md:gap-8 my-[2rem]'>
            {catPopularShops.map((e, i) => {

              return <PopularNearest key={i} data={e} />
            })}
          </div>
        </>}
        {catPopularShopsIsLoading && <Spinner />}
        {catPopularShopsError && <ErrorCard />}


        {!catAllShopsIsLoading && !catAllShopsError && catAllShops && <>
          {catInfo && <CategorySectionTitle title={`All ${catInfo.name || 'Restaurant'}`} />}
          <HomeSectionLayout >
            {allShopsData.map((e, i) => {

              return <SaleCategoryCard data={e} key={i} type='shop' />
            })}
          </HomeSectionLayout>
        </>}
        {catAllShopsIsLoading && <Spinner />}
        {catAllShopsError && <ErrorCard />}


      </div>
    </>
  )
}

export default Category
