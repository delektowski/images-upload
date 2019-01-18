import React, { Component } from 'react';
import ImagesGenerator from '../../components/ImagesGenerator/ImagesGenerator';
import Button from '../../components/Button/Button';
import Counter from '../../components/Counter/Counter';
import Filter from '../../components/Filter/Filter';
import Layout from '../../Layout/Layout';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import classes from './Uploader.module.scss';

class Uploader extends Component {
	state = {
		userName: 'Marcin',
		picturesDataObj: null,
		selectedfiles: null,
		buttonIsDisabled: true
	};

	componentDidMount() {
		const userNameDbElement = firebase.database().ref().child(this.state.userName);
		userNameDbElement.on('value', (snapshot) => {
			if (!snapshot.exists()) return;
			const picturesDataObj = snapshot.val();
			this.setState({
				picturesDataObj: picturesDataObj
			});
		});
	}

	selectImageHandler = (e) => {
		this.setState({
			selectedfiles: e.target.files,
			buttonIsDisabled: false
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
						firebase.database().ref(this.state.userName + '/').child(pictureTitle).set({
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
	};

	render() {
		return (
			<Layout>
				<div className={classes.Uploader}>
					<h1>{this.state.userName}</h1>
					<input type="file" multiple onChange={this.selectImageHandler} />
					<Button
						clicked={this.uploadHandler}
						buttonText="UPLOAD"
						buttonColor="Button__green"
						buttonIsDisabled={this.state.buttonIsDisabled}
					/>
					<Counter picturesDataObj={this.state.picturesDataObj} />
					<Filter />
					<div className={classes.Uploader__imagesContainer}>
						<ImagesGenerator
							images={this.state.picturesPaths}
							titles={this.state.picturesTitles}
							picturesDataObj={this.state.picturesDataObj}
							userName={this.state.userName}
						/>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Uploader;