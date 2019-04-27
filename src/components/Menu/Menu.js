import React from 'react';
import Logout from './Logout/Logout';
import Reset from './Reset/Reset';
import Selection from './Selection/Selection';
import CheckoutRelease from './CheckoutRelease/CheckoutRelease';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem } from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

const menu = ({
  imagesDataObj,
  isAdminLogin,
  isCheckout,
  isMenuOpen,
  onCheckoutClose,
  onCheckoutRelease,
  onLogoutHandler,
  onMenuClose,
  onMenuOpen,
  userName,
}) => {
  console.count('MENU');
  const menuOpen = Boolean(isMenuOpen);
  let reset = null;
  let checkout = null;
  let selection = null;

  if (!isAdminLogin && !isCheckout) {
    reset = (
      <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
        <Reset
          userName={userName}
          imagesDataObj={imagesDataObj}
          onMenuClose={onMenuClose}
        />
      </MenuItem>
    );
  }

  if (!isAdminLogin && !isCheckout) {
    checkout = (
      <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
        <CheckoutRelease
          onCheckoutRelease={onCheckoutRelease}
          onMenuClose={onMenuClose}
        />
      </MenuItem>
    );
  }

  if (isCheckout) {
    selection = (
      <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
        <Selection
          onCheckoutClose={onCheckoutClose}
          onMenuClose={onMenuClose}
        />
      </MenuItem>
    );
  }

  const logoutHandler = () => {
    onMenuClose();
    onLogoutHandler();
  };

  return (
    <div>
      <IconButton onClick={e => onMenuOpen(e.target)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={isMenuOpen}
        disableAutoFocusItem
        open={menuOpen}
        onClose={onMenuClose}
        PaperProps={{
          style: {
            width: 200,
          },
        }}
      >
        {reset}
        {checkout}
        {selection}

        <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Logout userName={userName} onLogoutHandler={logoutHandler} />
        </MenuItem>
      </Menu>
    </div>
  );
};

menu.propTypes = {
  imagesDataObj: PropTypes.object,
  isAdminLogin: PropTypes.bool,
  isCheckout: PropTypes.bool,
  isMenuOpen: PropTypes.any,
  onCheckoutClose: PropTypes.func,
  onCheckoutRelease: PropTypes.func,
  onLogoutHandler: PropTypes.func,
  onMenuClose: PropTypes.func,
  onMenuOpen: PropTypes.func,
  userName: PropTypes.string,
};

export default menu;
