// import React from 'react'

// const SidebarMenu = () => {
//   return (
//     <div>SidebarMenu</div>
//   )
// }

// export default SidebarMenu


import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './_sidebar.scss';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import './_navbar.scss';

import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';


import { Sidebar } from '..';


export default function SidebarMenu() {
  // const token = useSelector(state => state.user.token);
  const navigate = useNavigate();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{
        display: 'flex', alignItems: 'center', textAlign: 'center'
      }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: '1rem', mr: '2.5rem' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}>

            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '2.5rem',

                borderRadius: '50%',
                backgroundColor: 'transparent',
              }}>
              <GiHamburgerMenu />
            </span>

          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 3.6,
            width: '35rem',
            maxHeight: '70rem',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        sx={{
          '& .MuiMenuItem-root': { fontSize: '1.6rem' },

        }}>
        <Sidebar />
      </Menu>
    </>
  );
}
