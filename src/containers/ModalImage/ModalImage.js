import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	widtha: {
		width: 'auto',
		height: 'auto',
		display: 'flex',
		justifyContent: 'center',
		padding: 0,
		overflow: 'hidden'
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
		console.count('MODALIMAGE');
		const { classes } = this.props;
		const mediaQuery =
			window.innerWidth <= 600
				? { width: 350, margin: '0 auto', marginTop: 100 }
				: { width: 750, marginTop: 100 };

		return (
			<div>
				<Dialog
					maxWidth={'md'}
					scroll="body"
					open={this.props.isImageLarge === this.props.caption}
					onClose={this.props.onImageLargeClose}
					PaperProps={{ style: mediaQuery }}
					PaperComponent="div"
				>
					<DialogContent style={{ padding: 0 }} className={classes.widtha}>
						{this.props.children}
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(ModalImage);
