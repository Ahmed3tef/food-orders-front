// import React from 'react'

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';

// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// const BorderLinearProgress = styled(LinearProgress)(() => ({
//   height: '2rem',
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: '#231F20'
//     ,
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: '#0F3D3E',

//   },
// }));

// const ProgressBar = () => {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <LinearProgress variant="determinate" value={50} />
//     </Box>
//   )
// }

// export default ProgressBar

import React from 'react'

const ProgressBar = ({ full, remaining }) => {
  return (
    <div className='text-start w-full'>
      <h5 className='text-base'>
        {remaining} Products Left
      </h5>
      <div className="progress-shadow rounded-full w-full relative h-[1.3rem] bg-progressGray">
        <span className="bar rounded-full absolute top-0 left-0 bg-darkGreen h-full" style={{
          width: (full - remaining) / full * 100 + '%',
        }}></span>
      </div>
    </div>
  )
}

export default ProgressBar
