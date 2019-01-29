import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// Initialize Firebase
const config = {
	apiKey: 'AIzaSyCj6Pdybp3u5NdOUGzCK8ly2UnjtKoRfMs',
	authDomain: 'hooks-b96d6.firebaseapp.com',
	databaseURL: 'https://hooks-b96d6.firebaseio.com',
	projectId: 'hooks-b96d6',
	storageBucket: 'hooks-b96d6.appspot.com',
	messagingSenderId: '114520526525'
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
