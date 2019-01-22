import React, { Component } from 'react';
import Button from '../../Shared/Button/Button';
import classes from './Filter.module.scss';

class Filter extends Component {
	state = {
		greenClicked: false,
		blueClicked: false,
		redClicked: false,
		allClicked: false,
		notSelectedClicked: false,
		anyButtonClicked: false
	};

	buttonClickHandler = (whichButton) => {
		switch (whichButton) {
			case 'greenClicked':
				this.setState((prevState) => {
					return {
						greenClicked: !prevState.greenClicked,
						allClicked: false,
						notSelectedClicked: false,
						anyButtonClicked: true
					};
				});
				break;

			case 'blueClicked':
				this.setState((prevState) => {
					return {
						blueClicked: !prevState.blueClicked,
						allClicked: false,
						notSelectedClicked: false,
						anyButtonClicked: true
					};
				});
				break;

			case 'redClicked':
				this.setState((prevState) => {
					return {
						redClicked: !prevState.redClicked,
						allClicked: false,
						notSelectedClicked: false,
						anyButtonClicked: true
					};
				});
				break;

			case 'allClicked':
				this.setState((prevState) => {
					return {
						greenClicked: false,
						blueClicked: false,
						redClicked: false,
						allClicked: true,
						notSelectedClicked: false,
						anyButtonClicked: true
					};
				});
				break;

			case 'notSelectedClicked':
				this.setState((prevState) => {
					return {
						greenClicked: false,
						blueClicked: false,
						redClicked: false,
						allClicked: false,
						notSelectedClicked: true,
						anyButtonClicked: true
					};
				});
				break;

			default:
				break;
		}
	};

	componentDidUpdate() {
		if (this.state.anyButtonClicked) {
			this.props.filterButtonsState(this.state);
			this.setState({ anyButtonClicked: false });
		}
	}

	render() {
		return (
			<div className={classes.Filter}>
				<Button
					clicked={() => this.buttonClickHandler('greenClicked')}
					buttonText="tak"
					buttonColor="Button__green"
				/>
				<Button
					clicked={() => this.buttonClickHandler('blueClicked')}
					buttonText="może"
					buttonColor="Button__blue"
				/>
				<Button
					clicked={() => this.buttonClickHandler('redClicked')}
					buttonText="nie"
					buttonColor="Button__red"
				/>
				<Button clicked={() => this.buttonClickHandler('allClicked')} buttonText="wszystkie" buttonColor="" />
				<Button
					clicked={() => this.buttonClickHandler('notSelectedClicked')}
					buttonText="niezaznaczone"
					buttonColor=""
				/>
			</div>
		);
	}
}

export default Filter;
