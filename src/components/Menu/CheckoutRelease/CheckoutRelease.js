import React from 'react';
import { Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';

const checkoutRelease = ({ onCheckoutRelease, onMenuClose }) => {
  console.count('CHECKOUTRELEASE');
  const checkoutRelease = () => {
    onCheckoutRelease();
    onMenuClose();
  };

  return (
    <Typography
      style={{ width: '100%' }}
      variant="overline"
      align="center"
      onClick={checkoutRelease}
    >
      podsumowanie
    </Typography>
  );
};

checkoutRelease.propTypes = {
  onCheckoutRelease: PropTypes.func,
  onMenuClose: PropTypes.func,
};

export default checkoutRelease;
