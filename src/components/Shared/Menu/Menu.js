import React from 'react';
import Logout from '../../Logout/Logout';
import Reset from '../../UserPanel/Reset/Reset';
import Selection from '../../UserPanel/Selection/Selection';
import CheckoutRelease from './CheckoutRelease/CheckoutRelease';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem } from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const menu = (props) => {
	console.count('MENU');
	const isMenuOpen = Boolean(props.isMenuOpen);
	const anchorEl = props.isMenuOpen;
	let reset = null;
	let checkout = null;
	let selection = null;

	if (!props.isAdminLogin && !props.isCheckout) {
		reset = (
			<MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
				<Reset userName={props.userName} imagesDataObj={props.imagesDataObj} onMenuClose={props.onMenuClose} />
			</MenuItem>
		);
	}

	if (!props.isAdminLogin && !props.isCheckout) {
		checkout = (
			<MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
				<CheckoutRelease onCheckoutRelease={props.onCheckoutRelease} onMenuClose={props.onMenuClose} />
			</MenuItem>
		);
	}

	if (props.isCheckout) {
		selection = (
			<MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
				<Selection onCheckoutClose={props.onCheckoutClose} onMenuClose={props.onMenuClose} />
			</MenuItem>
		);
	}

	return (
		<div>
			<IconButton onClick={(e) => props.onMenuOpen(e.target)}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				disableAutoFocusItem
				open={isMenuOpen}
				onClose={props.onMenuClose}
				PaperProps={{
					style: {
						width: 200
					}
				}}
			>
				{reset}
				{checkout}
				{selection}

				<MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
					<Logout userName={props.userName} onLogoutHandler={props.onLogoutHandler} />
				</MenuItem>
			</Menu>
		</div>
	);
};

export default menu;
