import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAUKm2cb6xXRKoIi6lUsrJkSARfzYryXNk',
  authDomain: 'peekpickpic.firebaseapp.com',
  databaseURL: 'https://peekpickpic.firebaseio.com',
  projectId: 'peekpickpic',
  storageBucket: 'peekpickpic.appspot.com',
  messagingSenderId: '39879741826',
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
