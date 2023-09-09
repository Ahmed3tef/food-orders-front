import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CategoryContainer, ErrorCard, PageNavigation, Spinner } from '../components'
import { loadCategories } from '../store/reducers/categories'
const Categories = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const isLoading = useSelector(state => state.categories.isLoading);
  const error = useSelector(state => state.categories.error);

  useEffect(() => {
    dispatch(loadCategories({ lat: 30, long: 30 }))
  }, [])
  return (
    <>
      <PageNavigation title1='Home' path1='/' title2='Other Categories' />
      {!isLoading && categories.length > 0 &&
        categories.map((category, i) => <CategoryContainer data={category} key={i} />)
      }
      {isLoading && <Spinner />}
      {error && <ErrorCard />}
    </>
  )
}

export default Categories
