import React, { Component } from 'react';
import MainView from './containers/MainView/MainView';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<BrowserRouter basename="/images-upload">
					<MainView />
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
