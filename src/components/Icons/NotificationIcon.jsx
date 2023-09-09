
import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import './_navbar.scss';


import { FaBell } from 'react-icons/fa';
import { Badge } from '@mui/material';
// import { logout } from '../../store/reducers/auth';
import hm from '../../assets/images/hm.webp';
import { NotificationCard } from '..';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 3,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '1.2rem',
    backgroundColor: 'red'
  },
}));

export default function NotificationIcon() {
  // const token = useSelector(state => state.user.token);
  const navigate = useNavigate();

  const notificationEl = {
    title: 'H & M in Clothes Category added an offers on some products.',
    date: new Date('2022-11-01T11:26:43.098Z'),
    image: hm,
  }
  const data = [1, 2, 3]

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  // const dispatch = useDispatch();
  // const logoutHandler = () => {
  //   dispatch(logout());
  //   navigate('/');
  // };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: '1rem', mr: '2.5rem' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}>
            <StyledBadge badgeContent={data.length} color='secondary'>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--color-nav-lighter)',
                  fontSize: '2rem',
                  padding: '.6rem ',
                  borderRadius: '50%',
                  backgroundColor: '#F1F1F1',
                }}>
                <FaBell />
              </span>
            </StyledBadge>
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
            mt: 3,
            width: '35rem',
            maxHeight: '70rem',


          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        sx={{
          '& .MuiMenuItem-root': { fontSize: '1.6rem' },
        }}>
        {data.map((el, i) => {
          return <MenuItem onClick={() => navigate('/login')} key={i} >
            <NotificationCard
              title={notificationEl.title} date={notificationEl.date.toLocaleString('en-UK', {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                hour12: true,
                minute: '2-digit',
              })} image={notificationEl.image}

            />
          </MenuItem>
        })}



      </Menu>
    </>
  );
}
