import React from 'react'

import { CategoryHeader, HomeSectionLayout, SaleCategoryCard } from '..'

const CategoryContainer = ({ data, isLoading }) => {


  return (
    <div className='container-mx'>

      <CategoryHeader data={data.category} />
      <HomeSectionLayout>{data.shops.map((e, i) => {
        return <SaleCategoryCard data={e} key={i} type='cat' />
      })}
      </HomeSectionLayout>
    </div>
  )
}

export default CategoryContainer
