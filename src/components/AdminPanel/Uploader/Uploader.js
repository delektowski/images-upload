import React, { Component } from 'react';
import classes from './Uploader.module.scss';
import Button from '../../Shared/Button/Button';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

class Uploader extends Component {
	state = {
		selectedfiles: null,
		isButtonDisabled: true
	};

	getSelectedImagesHandler = (files) => {
		this.setState({
			selectedfiles: files,
			isButtonDisabled: false
		});
	};

	uploadHandler = () => {
		const files = this.state.selectedfiles;
		const metadata = {
			contentType: 'image/jpeg'
		};
		const storageRef = firebase.storage().ref();
		const filesArr = [ ...files ];

		filesArr.forEach((file, i) => {
			const uploadTask = storageRef.child(`images/${this.props.userName}/${file.name}`).put(file, metadata);
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot) => {
					const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
					console.log('Upload (' + i + ') is: ' + Math.round(progress) + '%');
				},
				(error) => {
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
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						firebase.database().ref(this.props.userName + '/images/').child(pictureTitle).set({
							containerColor: '',
							path: downloadURL,
							isClickedGreen: false,
							isClickedBlue: false,
							isClickedRed: false,
							comment: ''
						});
					});
				}
			);
		});

		this.disableUploadButtonHandler();
	};

	selectImageHandler = (e) => {
		this.setState({
			selectedfiles: e.target.files,
			isButtonDisabled: false
		});
	};

	disableUploadButtonHandler = () => {
		this.setState({
			isButtonDisabled: true
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const userNameDbElement = firebase.database().ref(this.props.userName);
				userNameDbElement.on('value', (snapshot) => {
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
		return (
			<div className={classes.Uploader}>
				<input type="file" multiple onChange={this.selectImageHandler} />
				<Button
					clicked={this.uploadHandler}
					buttonText="UPLOAD"
					buttonColor="Button__green"
					isButtonDisabled={this.state.isButtonDisabled}
				/>
			</div>
		);
	}
}

export default Uploader;
