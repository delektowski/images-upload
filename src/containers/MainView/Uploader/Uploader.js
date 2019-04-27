import React, { Component } from 'react';
import { Button, Fade } from '@material-ui/core/';
import { DropzoneArea } from 'material-ui-dropzone';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import PropTypes from 'prop-types';

class Uploader extends Component {
  state = {
    selectedfiles: null,
    isButtonDisabled: true,
  };

  uploadHandler = () => {
    const files = this.state.selectedfiles;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = firebase.storage().ref();
    const filesArr = [...files];

    filesArr.forEach((file, i) => {
      const uploadTask = storageRef
        .child(`images/${this.props.userName}/${file.name}`)
        .put(file, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload (' + i + ') is: ' + Math.round(progress) + '%');
        },
        error => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('No permission');
              break;
            case 'storage/canceled':
              console.log('Stopped upload');
              break;
            case 'storage/unknown':
              console.log('Unknown error');
              break;
            default:
              break;
          }
        },
        () => {
          const pictureTitle = uploadTask.snapshot.ref.name.replace('.jpg', '');
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            firebase
              .database()
              .ref(this.props.userName + '/images/')
              .child(pictureTitle)
              .set({
                containerColor: '',
                path: downloadURL,
                isClickedGreen: false,
                isClickedBlue: false,
                isClickedRed: true,
                comment: '',
              });
          });
        },
      );
    });

    this.disableUploadButtonHandler();
  };

  selectImageHandler = e => {
    this.setState({
      selectedfiles: e,
      isButtonDisabled: false,
    });
    this.props.selectedfiles(e);
  };

  disableUploadButtonHandler = () => {
    this.setState({
      isButtonDisabled: true,
      selectedfiles: null,
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userNameDbElement = firebase.database().ref(this.props.userName);
        userNameDbElement.on('value', snapshot => {
          if (!snapshot.exists()) return;
          const imagesDataObj = snapshot.val();
          if (imagesDataObj.images) {
            this.props.imagesDataObj(imagesDataObj.images);
          }
          this.props.loginClicked();
        });
      }
    });
  };

  render() {
    const { isUserCreated } = this.props;
    const { selectedfiles } = this.state;
    console.count('UPLOADER');
    return isUserCreated ? (
      <Fade in={isUserCreated} timeout={500}>
        <div style={{ marginTop: '2%', width: '100%' }}>
          <Button
            variant="contained"
            style={{ marginBottom: '2%' }}
            size="large"
            color="primary"
            onClick={this.uploadHandler}
            disabled={!selectedfiles}
            fullWidth
          >
            Wyślij
          </Button>
          <DropzoneArea
            filesLimit={100}
            showPreviewsInDropzone={false}
            showPreviews={true}
            dropzoneText={'Przeciągnij i upuść zdjęcia albo kliknij aby dodać'}
            onChange={this.selectImageHandler}
            showAlerts={false}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            maxFileSize={5000000}
          />
          <Button
            variant="contained"
            style={{ marginTop: '2%' }}
            size="large"
            color="primary"
            onClick={this.uploadHandler}
            disabled={!selectedfiles}
            fullWidth
          >
            Wyślij
          </Button>
        </div>
      </Fade>
    ) : null;
  }
}

Uploader.propTypes = {
  imagesDataObj: PropTypes.func,
  isButtonDisabled: PropTypes.bool,
  isUserCreated: PropTypes.bool,
  loginClicked: PropTypes.func,
  selectedfiles: PropTypes.func,
  uploadSelectedImages: PropTypes.array,
  userName: PropTypes.string,
};

export default Uploader;
