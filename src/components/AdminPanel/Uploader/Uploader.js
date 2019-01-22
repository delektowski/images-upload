import React from 'react';
import classes from './Uploader.module.scss';
import Button from '../../Shared/Button/Button';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const uploader = (props) => {
	const selectImageHandler = (e) => {
		props.pickSelectedImages(e.target.files);
	};

	const uploadHandler = () => {
		const files = props.uploadSelectedImages;
		const metadata = {
			contentType: 'image/jpeg'
		};
		const storageRef = firebase.storage().ref();
		const filesArr = [ ...files ];

		filesArr.forEach((file, i) => {
			const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
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
						firebase.database().ref(props.userName + '/').child(pictureTitle).set({
							containerColor: '',
							path: downloadURL,
							isClickedGreen: false,
							isClickedBlue: false,
							isClickedRed: false
						});
					});
				}
			);
		});
		props.disableButton();
	};

	return (
		<div className={classes.Uploader}>
			<input type="file" multiple onChange={selectImageHandler} />
			<Button
				clicked={uploadHandler}
				buttonText="UPLOAD"
				buttonColor="Button__green"
				buttonIsDisabled={props.isButtonDisabled}
			/>
		</div>
	);
};

export default uploader;
