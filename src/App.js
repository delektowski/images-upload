import React, { Component } from 'react';
import MainView from './containers/MainView/MainView';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<MainView />
			</React.Fragment>
		);
	}
}

export default App;
