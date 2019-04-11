/* eslint-disable no-undef */
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: BASE_URL,
  projectId: PROJECT_ID,
  storageBucket: BUCKET,
  messagingSenderId: SENDER_ID,
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
