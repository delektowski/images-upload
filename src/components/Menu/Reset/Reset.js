import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';

const reset = ({ imagesDataObj, onMenuClose, userName }) => {
  console.count('RESET');
  const resetUserSelection = () => {
    for (let value in imagesDataObj) {
      firebase
        .database()
        .ref(`${userName}/images/${value}`)
        .update({
          containerColor: '',
          isClickedBlue: false,
          isClickedGreen: false,
          isClickedRed: true,
        });
    }
    onMenuClose();
  };
  return (
    <Typography
      style={{ width: '100%' }}
      variant="overline"
      align="center"
      onClick={resetUserSelection}
    >
      RESET
    </Typography>
  );
};

reset.propTypes = {
  imagesDataObj: PropTypes.object,
  onMenuClose: PropTypes.func,
  userName: PropTypes.string,
};

export default reset;
