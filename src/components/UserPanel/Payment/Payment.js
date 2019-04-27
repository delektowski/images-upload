import React from 'react';
import { Paper, Typography, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import PropTypes from 'prop-types';

const styles = theme => ({
  paper: {
    background: 'whitesmoke',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingLeft: '.3125rem',
    paddingRight: '.3125rem',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  iconCaption: {
    fontSize: '.56rem',
  },
  iconCaptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '5.625rem',
  },
  iconCaptionContainerBig: {
    width: '6.875rem',
  },
  avatar: {
    height: '2.5rem',
    width: '2.5rem',
    marginLeft: '0.3125rem',
  },
  green: {
    color: 'green',
  },
  bgGreen: {
    background: 'green',
  },
  red: {
    color: 'rgb(245, 0, 87)',
  },
  bgRed: {
    background: 'rgb(245, 0, 87)',
  },
  bgPrimary: {
    background: 'rgb(48, 63, 159)',
  },
  blue: {
    color: 'rgb(63, 81, 181)',
  },
  bgBlue: {
    background: 'rgb(63, 81, 181)',
  },
  deepPurple: {
    color: deepPurple[500],
  },
  bgDeepPurple: {
    background: deepPurple[500],
  },
  white: {
    color: 'white',
  },
  primary: {
    color: 'rgb(48, 63, 159)',
  },
});

const Payment = ({
  classes,
  allImagesCost,
  countFreePictures,
  countPayPerImage,
  isCheckout,
  picturePrice,
  selectedImages,
}) => {
  console.count('PAYMENT');
  let selectionPayment = null;
  let checkoutPayment = null;

  if (!isCheckout) {
    selectionPayment = (
      <div
        className={[classes.iconCaptionContainer, classes.deepPurple].join(' ')}
      >
        <div>
          <Typography
            className={[classes.iconCaption, classes.deepPurple].join(' ')}
            variant="caption"
          >
            DARMOWE ZDJĘCIA
          </Typography>
        </div>
        <Avatar className={[classes.avatar, classes.bgDeepPurple].join(' ')}>
          <Typography className={classes.white} variant="caption">
            {countFreePictures}
          </Typography>
        </Avatar>
      </div>
    );
  }

  if (isCheckout) {
    checkoutPayment = (
      <div className={[classes.iconCaptionContainer, classes.green].join(' ')}>
        <div>
          <Typography
            className={[classes.iconCaption, classes.green].join(' ')}
            variant="caption"
          >
            WYBRANE ZDJĘCIA
          </Typography>
        </div>
        <Avatar className={[classes.avatar, classes.bgGreen].join(' ')}>
          <Typography className={classes.white} variant="caption">
            {selectedImages}
          </Typography>
        </Avatar>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        {selectionPayment}
        {checkoutPayment}
        <div
          className={[classes.iconCaptionContainer, classes.primary].join(' ')}
        >
          <div>
            <Typography
              className={[classes.iconCaption, classes.primary].join(' ')}
              variant="caption"
            >
              KOSZT WSZYSTKICH ZDJĘĆ
            </Typography>
          </div>
          <Avatar className={[classes.avatar, classes.bgPrimary].join(' ')}>
            <Typography className={classes.white} variant="caption">
              {allImagesCost} zł
            </Typography>
          </Avatar>
        </div>
        <div
          className={[
            classes.iconCaptionContainer,
            classes.iconCaptionContainerBig,
            classes.red,
          ].join(' ')}
        >
          <Typography
            className={[classes.iconCaption, classes.red].join(' ')}
            variant="caption"
          >
            KOSZT DODATKOWYCH ZDJĘĆ <br />{' '}
            <strong>{picturePrice} zł/szt.</strong>
          </Typography>

          <Avatar className={[classes.avatar, classes.bgRed].join(' ')}>
            <Typography className={classes.white} variant="caption">
              {countPayPerImage} zł
            </Typography>
          </Avatar>
        </div>
      </Paper>
    </React.Fragment>
  );
};

Payment.propTypes = {
  classes: PropTypes.object,
  allImagesCost: PropTypes.number,
  countFreePictures: PropTypes.any,
  countPayPerImage: PropTypes.number,
  isCheckout: PropTypes.bool,
  picturePrice: PropTypes.any,
  selectedImages: PropTypes.number,
};

export default withStyles(styles)(Payment);
