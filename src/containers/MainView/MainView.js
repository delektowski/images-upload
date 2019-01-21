import React, { Component } from 'react';
import ImagesGenerator from '../../components/ImagesGenerator/ImagesGenerator';
import Uploader from '../../components/Uploader/Uploader';
import Counter from '../../components/Counter/Counter';
import Filter from '../../components/Filter/Filter';
import Button from '../../components/Button/Button';
import Reset from '../../components/Reset/Reset';
import Layout from '../../Layout/Layout';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import classes from './MainView.module.scss';

class MainView extends Component {
	state = {
		userName: '',
		loginField: '',
		isLoginClicked: false,
		createUserField: '',
		imagesDataObj: null,
		selectedfiles: null,
		buttonIsDisabled: true,
		filterButtonsState: false,
		isAdminLogin: false
	};

	componentDidUpdate() {
		if (this.state.loginField && this.state.isLoginClicked && this.state.userName) {
			console.log('fik');

			const userNameDbElement = firebase.database().ref().child(this.state.userName);
			userNameDbElement.on('value', (snapshot) => {
				if (!snapshot.exists()) return;
				const imagesDataObj = snapshot.val();
				this.setState({
					imagesDataObj: imagesDataObj,
					isLoginClicked: false
				});
			});
		}
	}

	onLoginHandler = (e) => {
		//Firebase starts listening for any changes over the user database; if any occurs the app state of user data is changing also
		if (e) e.preventDefault();
		if (this.state.loginField === 'admin') {
			this.setState({
				isAdminLogin: true,
				isLoginClicked: true
			});
		} else {
			console.log('else');

			this.setState({
				userName: this.state.loginField,
				isLoginClicked: true
			});
		}
	};

	onLogoutHandler = (e) => {
		this.setState({
			userName: '',
			loginField: '',
			isLoginClicked: false,
			createUserField: '',
			imagesDataObj: null,
			selectedfiles: null,
			buttonIsDisabled: true,
			filterButtonsState: false,
			isAdminLogin: false
		});
	};

	onCreateUserHandler = (e) => {
		e.preventDefault();
		this.setState({
			isAdminLogin: true,
			userName: this.state.createUserField
		});
		this.onLoginHandler();
	};

	getSelectedImagesHandler = (files) => {
		this.setState({
			selectedfiles: files,
			buttonIsDisabled: false
		});
	};

	disableUploadButtonHandler = () => {
		this.setState({
			buttonIsDisabled: true
		});
	};

	filterButtonsStateHandler = (buttonsStateObj) => {
		this.setState({
			filterButtonsState: buttonsStateObj
		});
	};

	render() {
		let adminPanel = null;
		let userPanel = null;
		let login = null;
		if (this.state.isAdminLogin) {
			adminPanel = (
				<React.Fragment>
					<Button clicked={(e) => this.onLogoutHandler(e)} buttonText="Logout" buttonColor="Button__red" />
					<label>Create User:</label>
					<input
						placeholder="user name"
						value={this.state.createUserField}
						onChange={(e) => this.setState({ createUserField: e.target.value })}
					/>
					<Button clicked={(e) => this.onCreateUserHandler(e)} buttonText="Create" buttonColor="" />

					<Uploader
						userName={this.state.userName}
						pickSelectedImages={this.getSelectedImagesHandler}
						uploadSelectedImages={this.state.selectedfiles}
						isButtonDisabled={this.state.buttonIsDisabled}
						disableButton={this.disableUploadButtonHandler}
					/>
				</React.Fragment>
			);
		}
		if (this.state.userName && !this.state.isAdminLogin) {
			userPanel = (
				<React.Fragment>
					<Button clicked={(e) => this.onLogoutHandler(e)} buttonText="Logout" buttonColor="Button__red" />
					<Counter imagesDataObj={this.state.imagesDataObj} />
					<Filter filterButtonsState={this.filterButtonsStateHandler} />
					<Reset userName={this.state.userName} imagesDataObj={this.state.imagesDataObj} />
				</React.Fragment>
			);
		}
		if (!this.state.isAdminLogin && !this.state.userName) {
			login = (
				<React.Fragment>
					<label>Login:</label>
					<input
						placeholder="user login"
						value={this.state.loginField}
						onChange={(e) => this.setState({ loginField: e.target.value })}
						onKeyPress={(e) => {
							if (e.key === 'Enter') this.onLoginHandler(e);
						}}
					/>
					<Button clicked={(e) => this.onLoginHandler(e)} buttonText="Login" buttonColor="Button__blue" />
				</React.Fragment>
			);
		}

		return (
			<Layout>
				<div className={classes.MainView}>
					<h4>User name: {this.state.userName}</h4>
					{login}
					{adminPanel}
					{userPanel}
					<div className={classes.MainView__imagesContainer}>
						<ImagesGenerator
							images={this.state.picturesPaths}
							titles={this.state.picturesTitles}
							imagesDataObj={this.state.imagesDataObj}
							userName={this.state.userName}
							filterButtonsState={this.state.filterButtonsState}
							reset={this.state.reset}
							isAdminLogin={this.state.isAdminLogin}
						/>
					</div>
				</div>
			</Layout>
		);
	}
}

export default MainView;
