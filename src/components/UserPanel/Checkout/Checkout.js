import React from 'react';
import { Button } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Payment from '../../UserPanel/Payment/Payment';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    marginTop: 65,
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
    position: 'fixed',
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10rem',
    overflow: 'scroll',
    height: `calc(${window.innerHeight}px - 160px)`,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '.625rem',
    },
  },
  paymentContainer: {
    width: '100%',
  },
  logout__button: {
    [theme.breakpoints.down('xs')]: {
      height: '3.75rem',
      fontSize: '.7rem',
    },
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: '1%',
    margin: '0 auto',
    width: '90%',
  },
  image: {
    width: '9.375rem',
    [theme.breakpoints.down('xs')]: {
      width: '5.625rem',
    },
  },
});

const checkout = ({
  classes,
  allImagesCost,
  allImagesTitles,
  countFreePictures,
  countPayPerImage,
  imagesDataObj,
  isCheckout,
  picturePrice,
  selectedImages,
  userName,
}) => {
  console.count('CHECKOUT');

  const getSelectedTitles = () => {
    const onSelectedImages = [];
    for (let imageTitle in imagesDataObj) {
      if (imagesDataObj[imageTitle].isClickedGreen === true) {
        onSelectedImages.push(imageTitle);
      }
    }
    return onSelectedImages;
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.paymentContainer}>
          <Payment
            countPayPerImage={countPayPerImage}
            allImagesCost={allImagesCost}
            countFreePictures={countFreePictures}
            picturePrice={picturePrice}
            selectedImages={selectedImages}
            isCheckout={isCheckout}
          />
        </div>
        <div className={classes.buttonsContainer}>
          <form
            className={classes.buttonContainer}
            action="https://jumprock.co/mail/peekpickpic"
            method="post"
          >
            <input
              style={{ display: 'none' }}
              type="text"
              name="message"
              value={`***UŻYTKOWNIK: "${
                userName.userName
              }" *** TYTUŁY ZDJĘĆ: "${allImagesTitles()}" *** WYBRANA OPCJA: "wszystkie zdjęcia" *** KOSZT: ${allImagesCost} zł ***`}
              placeholder="message"
              readOnly
            />
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
              className={[classes.logout__button].join(' ')}
              fullWidth
            >
              wybieram: wszystkie zdjęcia
            </Button>
            <input
              type="hidden"
              name="after"
              value={`${window.location.href}confirmation`}
            />
          </form>
          <div className={classes.buttonContainer}>
            <form
              className={classes.buttonContainer}
              action="https://jumprock.co/mail/peekpickpic"
              method="post"
            >
              <input
                style={{ display: 'none' }}
                type="text"
                name="message"
                value={`***UŻYTKOWNIK: "${
                  userName.userName
                }" *** TYTUŁY ZDJĘĆ: "${getSelectedTitles().join(
                  '" , "',
                )}" *** WYBRANA OPCJA: "darmowe + dodatkowe zdjęcia" *** KOSZT: ${countPayPerImage} zł ***`}
                placeholder="message"
                readOnly
              />
              <Button
                variant="contained"
                size="small"
                type="submit"
                className={classes.logout__button}
                fullWidth
                color="secondary"
              >
                wybieram: darmowe + dodatkowe zdjęcia
              </Button>
              <input
                type="hidden"
                name="after"
                value={`${window.location.href}confirmation`}
              />
            </form>
          </div>
        </div>
      </div>
      <div className={[classes.paper, classes.imagesContainer].join(' ')}>
        {getSelectedTitles().map(ele => (
          <figure key={ele}>
            <img
              className={classes.image}
              src={imagesDataObj[ele].path}
              alt={ele}
            />
            <figcaption style={{ textAlign: 'center', fontSize: '.7rem' }}>
              {ele}
            </figcaption>
          </figure>
        ))}
      </div>
    </React.Fragment>
  );
};

checkout.propTypes = {
  classes: PropTypes.object,
  allImagesCost: PropTypes.number,
  allImagesTitles: PropTypes.func,
  countFreePictures: PropTypes.any,
  countPayPerImage: PropTypes.number,
  imagesDataObj: PropTypes.object,
  isCheckout: PropTypes.bool,
  picturePrice: PropTypes.any,
  selectedImages: PropTypes.number,
};

export default withStyles(styles)(checkout);
