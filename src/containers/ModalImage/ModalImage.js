import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from '../Image/Image';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	widtha: {
		width: 'auto',
		display: 'flex',
		justifyContent: 'center',
		padding: 0
	},
	outside: {},
	paper: {
		background: 'blue'
	}
};

class ModalImage extends React.Component {
	state = {
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					maxWidth={'lg'}
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
					<DialogContent className={classes.widtha}>
						<h1>Kokos</h1>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(ModalImage);
