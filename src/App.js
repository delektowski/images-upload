import React, { Component } from 'react';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import './App.css';

class App extends Component {
	state = {
		userName: 'Marcin',
		picturesPaths: [],
		picturesTitles: [],
		selectedfiles: null,
		inputValue: ''
	};

	componentDidMount() {
		const userNameDbElement = firebase.database().ref().child(this.state.userName);
		let isUserNameDbElementFirstUpdate = firebase.database().ref().child('fik');
		console.log('db', isUserNameDbElementFirstUpdate);

		userNameDbElement.on('value', (snapshot) => {
			const picturesTitles = Object.keys(snapshot.val());
			const picturesPaths = [];
			for (const prop in snapshot.val()) {
				const picturePath = snapshot.val()[prop].path;
				picturesPaths.push(picturePath);
			}

			this.setState({
				picturesTitles: picturesTitles,
				picturesPaths: picturesPaths
			});
		});
	}

	selectImageHandler = (e) => {
		this.setState({ selectedfiles: e.target.files });
	};

	uploadHandler = () => {
		const files = this.state.selectedfiles;
		const metadata = {
			contentType: 'image/jpeg'
		};

		const storageRef = firebase.storage().ref();
		const filesArr = [ ...files ];
		console.log(filesArr);

		filesArr.forEach((file, i) => {
			const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot) => {
					const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
					console.log('Upload (' + i + ') is: ' + Math.round(progress) + '%');
					// console.log('snap', snapshot.ref.name);
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
					console.log(pictureTitle);

					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						firebase.database().ref(this.state.userName + '/').child(pictureTitle).set({
							path: downloadURL,
							selectYes: false,
							selectMaybe: false,
							selectNot: false
						});
					});
				}
			);
		});
	};

	setDataHandler = (e) => {
		this.setState({ inputValue: e.target.value });
	};

	sendDataHandler = () => {
		firebase.database().ref('marcin/').child(this.state.inputValue).set({
			path: 'link to picture',
			selectYes: false,
			selectMaybe: false,
			selectNot: false
		});
	};

	render() {
		const images = this.state.picturesPaths;
		const titles = this.state.picturesTitles;

		const imageTitleObj = titles.reduce((sum, current) => {
			const img = images.filter((image) => {
				let patt = new RegExp(current, 'g');
				return patt.test(image);
			});
			return sum.concat({ [current]: img[0] });
		}, []);

		const imagesArr = imageTitleObj.map((element) => {
			return (
				<figure key={Object.keys(element)}>
					<img style={{ width: '200px', margin: '20px' }} src={Object.values(element)} alt="pic" />
					<figcaption>{Object.keys(element)}</figcaption>
				</figure>
			);
		});

		return (
			<div className="App">
				<h1>{this.state.userName}</h1>
				<input type="text" value={this.state.inputValue} onChange={this.setDataHandler} />
				<button onClick={this.sendDataHandler}>Send data</button>
				<input type="file" multiple onChange={this.selectImageHandler} />
				<button onClick={this.uploadHandler}>Upload</button>
				<div
					style={{
						width: '90%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexWrap: 'wrap'
						// flexDirection: 'row'
					}}
				>
					{imagesArr}
				</div>
			</div>
		);
	}
}

export default App;
