import React, { Component } from 'react';
import ImagesGenerator from '../../components/ImagesGenerator/ImagesGenerator';
import Uploader from '../../components/Uploader/Uploader';
import Counter from '../../components/Counter/Counter';
import Filter from '../../components/Filter/Filter';
import Reset from '../../components/Reset/Reset';
import Layout from '../../Layout/Layout';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import classes from './MainView.module.scss';

class MainView extends Component {
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

	getSelectedImagesHandler = (files) => {
		this.setState({
			selectedfiles: files,
			buttonIsDisabled: false
		});
	};

	filterButtonsStateHandler = (buttonsStateObj) => {
		this.setState({
			filterButtonsState: buttonsStateObj
		});
	};

	disableUploadButtonHandler = () => {
		this.setState({
			buttonIsDisabled: true
		});
	};

	render() {
		return (
			<Layout>
				<div className={classes.MainView}>
					<h1>Użytkownik: {this.state.userName}</h1>

					<Uploader
						userName={this.state.userName}
						pickSelectedImages={this.getSelectedImagesHandler}
						uploadSelectedImages={this.state.selectedfiles}
						isButtonDisabled={this.state.buttonIsDisabled}
						disableButton={this.disableUploadButtonHandler}
					/>

					<Counter imagesDataObj={this.state.imagesDataObj} />
					<Filter filterButtonsState={this.filterButtonsStateHandler} />
					<Reset userName={this.state.userName} imagesDataObj={this.state.imagesDataObj} />
					<div className={classes.MainView__imagesContainer}>
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

export default MainView;
