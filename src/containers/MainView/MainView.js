import React, { Component } from 'react';
import Login from './Login/Login';
import Layout from '../../hoc/Layout/Layout';
import Uploader from './Uploader/Uploader';
import CreateUser from './CreateUser/CreateUser';
import Confirmation from '../../components/UserPanel/Checkout/Confirmation/Confirmation';
import AplicationBar from './ApplicationBar/ApplicationBar';
import ImagesGeneratorAndCounter from './ImagesGeneratorAndCounter/ImagesGeneratorAndCounter';
import { AppBar, Toolbar, Typography, Fab, Drawer } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Copyright from '@material-ui/icons/Copyright';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
  mainView: {},
  icon: {
    fontSize: '1rem',
    marginRight: '2%',
  },
  footer: {
    background: 'whitesmoke',
    height: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
  },
  toolbar__footer: {
    display: 'flex',
    width: '18.75rem',

    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'fixed',
    left: '2%',
    zIndex: 10000,
    top: '1%',
  },
  drawerPaper: {
    width: '100%',
    height: '10rem',
    overflow: 'visible',
    border: 0,
    background: 'rgba(0, 0, 0, 0)',
    zIndex: 1000,
  },
  drawerPaperMenu: {
    width: '100%',
    height: '3.75rem',
    overflow: 'visible',
    border: 0,
    background: 'rgba(0, 0, 0, 0)',
  },

  zindexNegative: {
    zIndex: -1,
  },
  route: {
    background: 'green',
    width: '12.5rem',
    height: '6.25rem',
  },
  modal: {
    zIndex: '12.5rem',
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'rgba(114, 114, 114, 0)',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
};

class MainView extends Component {
  state = {
    userName: '',
    isLoginClicked: false,
    isCreateClicked: false,
    isCheckout: false,
    createUserLogin: '',
    createUserPassword: '',
    imagesDataObj: null,
    picturePrice: 0,
    discountProcent: 0,
    selectedfiles: [],
    isButtonDisabled: true,
    isAdminLogin: false,
    isAuthenticated: false,
    errorLogin: '',
    onUserCreated: false,
    isDrawerOpen: true,
    isFooterHidden: false,
  };

  onLoginDataPass = (
    imagesDataObj,
    freePicturesAmount,
    picturePrice,
    discountProcent,
  ) => {
    this.setState({
      imagesDataObj: imagesDataObj,
      isLoginClicked: false,
      freePicturesAmount: freePicturesAmount,
      picturePrice: picturePrice,
      discountProcent: discountProcent,
    });
  };

  onLogoutHandler = () => {
    window.location.reload();
  };

  onDrawerOpenHandler = () => {
    if (!this.state.imageClickedTitle) {
      this.setState(prevState => {
        return {
          isDrawerOpen: !prevState.isDrawerOpen,
        };
      });
    }
  };

  onCheckoutReleaseHandler = () => {
    this.setState({ isCheckout: true });
  };

  onCheckoutCloseHandler = () => {
    this.setState({ isCheckout: false });
  };

  onAuthenticationHandler = () => {
    this.setState({ isAuthenticated: true });
  };

  onIsLoginClickedHandler = () => {
    this.setState({ isLoginClicked: false });
  };

  onIsAdminLoginHandler = () => {
    this.setState({ isAdminLogin: true });
  };

  selectedfilesHandler = files => {
    this.setState({ selectedfiles: files });
  };

  adminLoginHandler = () => {
    this.setState({ isAdminLogin: true });
  };

  onChangeUserNameHandler = userName => {
    this.setState({ userName: userName, createUserLogin: userName });
  };

  imagesDataObjHandler = images => {
    this.setState({ imagesDataObj: images });
  };

  loginClickedHandler = () => {
    this.setState({ isLoginClicked: false });
  };

  onUserCreatedHandler = () => {
    this.setState({ isUserCreated: true });
  };

  render() {
    const { classes } = this.props;
    const {
      freePicturesAmount,
      picturePrice,
      discountProcent,
      imagesDataObj,
      selectedfiles,
      isUserCreated,
      createUserLogin,
      userName,
      isButtonDisabled,
      isAuthenticated,
      isAdminLogin,
      isDrawerOpen,
      isCheckout,
      errorLogin,
    } = this.state;

    let adminPanel = null;
    let login = null;
    let menuHideButton = null;
    let footerBar = null;
    let imagesGeneratorAndCounter = null;

    if (isAdminLogin) {
      adminPanel = (
        <React.Fragment>
          <CreateUser
            clicked={this.onLogoutHandler}
            adminLogin={this.adminLoginHandler}
            onChangeUserName={this.onChangeUserNameHandler}
            freePicturesAmount={freePicturesAmount}
            picturePrice={picturePrice}
            discountProcent={discountProcent}
            imagesAmount={imagesDataObj ? Object.keys(imagesDataObj).length : 0}
            loginClicked={this.loginClickedHandler}
            uploadSelectedImages={selectedfiles}
            onUserCreated={this.onUserCreatedHandler}
          />

          <Uploader
            userName={userName}
            uploadSelectedImages={selectedfiles}
            isButtonDisabled={isButtonDisabled}
            disableButton={this.disableUploadButtonHandler}
            imagesAmount={imagesDataObj ? Object.keys(imagesDataObj).length : 0}
            loginClicked={this.loginClickedHandler}
            selectedfiles={this.selectedfilesHandler}
            isUserCreated={isUserCreated}
            imagesDataObj={this.imagesDataObjHandler}
          />
        </React.Fragment>
      );
    }

    if (!isAdminLogin && !isAuthenticated) {
      login = (
        <Login
          onLogin={this.onLoginClickedHandler}
          onIsAdminLogin={this.onIsAdminLoginHandler}
          onIsLoginClicked={this.onIsLoginClickedHandler}
          onChangeUserName={this.onChangeUserNameHandler}
          isCreateUserLogin={createUserLogin}
          isAuthenticated={this.onAuthenticationHandler}
          onLoginDataPass={this.onLoginDataPass}
        />
      );
    }

    if (isAuthenticated && !isCheckout) {
      menuHideButton = (
        <Fab
          onClick={this.onDrawerOpenHandler}
          size="small"
          className={classes.fab}
        >
          {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
        </Fab>
      );
    }

    if (isAuthenticated) {
      imagesGeneratorAndCounter = (
        <ImagesGeneratorAndCounter
          imagesDataObj={imagesDataObj}
          freePicturesAmount={freePicturesAmount}
          discountProcent={discountProcent}
          picturePrice={picturePrice}
          userName={userName}
          isAdminLogin={isAdminLogin}
          onHideMenu={this.onDrawerOpenHandler}
          isDrawerOpen={isDrawerOpen}
          isCheckout={isCheckout}
          isAuthenticated={isAuthenticated}
        />
      );
    }

    if (!isAuthenticated) {
      footerBar = (
        <AppBar className={classes.footer} position="static" color="default">
          <Toolbar className={classes.toolbar__footer}>
            <Copyright className={classes.icon} />
            <Typography variant="caption" color="inherit">
              2019 Marcin Delektowski
            </Typography>
          </Toolbar>
        </AppBar>
      );
    }

    console.count('MAINVIEW');

    return (
      <React.Fragment>
        <Layout>
          <header>
            {menuHideButton}
            <Drawer
              transitionDuration={500}
              variant="persistent"
              anchor="left"
              open={isDrawerOpen}
              classes={{
                paper: classes.drawerPaperMenu,
              }}
            >
              <AplicationBar
                userName={userName}
                isAuthenticated={isAuthenticated}
                imagesDataObj={imagesDataObj}
                onLogoutHandler={this.onLogoutHandler}
                isAdminLogin={isAdminLogin}
                onCheckoutRelease={this.onCheckoutReleaseHandler}
                onCheckoutClose={this.onCheckoutCloseHandler}
                isCheckout={isCheckout}
              />
            </Drawer>
          </header>

          <main>
            <div className={classes.mainView}>
              <section>
                <Route
                  path={`/confirmation`}
                  render={() => {
                    return <Confirmation open={true} />;
                  }}
                />

                {errorLogin ? <p>{errorLogin}</p> : null}
                <Route
                  path={`/`}
                  render={() => {
                    return login;
                  }}
                />
              </section>

              <section>{adminPanel}</section>
              {imagesGeneratorAndCounter}
            </div>
          </main>
        </Layout>
        <footer>{footerBar}</footer>
      </React.Fragment>
    );
  }
}

MainView.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(MainView);
