// import React from 'react'

// const Pagination = ({ totalCount, perPageCount, setPage }) => {
//   const numOfPages = Math.round(totalCount / perPageCount)
//   console.log(numOfPages);
//   // takes active total, per page count   , page setter
//   return (
//     <div className='flex-center w-full gap-[1.5rem]'>{
//       [...new Array(numOfPages)].map((e, i) => <span className='border-2' key={i} onClick={() => setPage(e)}>{e}</span>
//       )

//     }</div>
//   )
// }

// export default Pagination

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ totalCount, perPageCount, setPage, currentPage }) {

  const numOfPages = Math.round(totalCount / perPageCount)
  // console.log(numOfPages);
  return (
    <div className='flex-center my-[3rem]'>

      <Stack spacing={8}>

        <Pagination count={numOfPages} variant="outlined" shape="rounded" onChange={(event, page) => {
          setPage(page);
        }} page={currentPage} sx={{
          '.MuiPagination-root': { fontSize: '2rem' }
        }} />
      </Stack>
    </div>
  );
}
