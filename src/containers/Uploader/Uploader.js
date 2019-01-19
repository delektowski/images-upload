import React, { Component } from 'react';
import ImagesGenerator from '../../components/ImagesGenerator/ImagesGenerator';
import Button from '../../components/Button/Button';
import Counter from '../../components/Counter/Counter';
import Filter from '../../components/Filter/Filter';
import Reset from '../../components/Reset/Reset';
import Layout from '../../Layout/Layout';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import classes from './Uploader.module.scss';

class Uploader extends Component {
	state = {
		userName: 'Marcin',
		imagesDataObj: null,
		selectedfiles: null,
		buttonIsDisabled: true,
		filterButtonsState: false
	};

	componentDidMount() {
		//Firebase starts listening for any changes over the user database; if any occurs the app state of user data is changing also
		const userNameDbElement = firebase.database().ref().child(this.state.userName);
		userNameDbElement.on('value', (snapshot) => {
			if (!snapshot.exists()) return;
			const imagesDataObj = snapshot.val();
			this.setState({
				imagesDataObj: imagesDataObj
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

	filterButtonsStateHandler = (buttonsStateObj) => {
		this.setState({
			filterButtonsState: buttonsStateObj
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
					<Counter imagesDataObj={this.state.imagesDataObj} />
					<Filter filterButtonsState={this.filterButtonsStateHandler} />
					<Reset userName={this.state.userName} imagesDataObj={this.state.imagesDataObj} />
					<div className={classes.Uploader__imagesContainer}>
						<ImagesGenerator
							images={this.state.picturesPaths}
							titles={this.state.picturesTitles}
							imagesDataObj={this.state.imagesDataObj}
							userName={this.state.userName}
							filterButtonsState={this.state.filterButtonsState}
							reset={this.state.reset}
						/>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Uploader;
