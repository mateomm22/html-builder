import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCnndgZFL7Tw73V4-0xlEP5qEvM3X0GJQU',
  authDomain: 'program-builder.firebaseapp.com',
  databaseURL: 'https://program-builder.firebaseio.com',
  projectId: 'program-builder',
  storageBucket: 'program-builder.appspot.com',
  messagingSenderId: '850037628604',
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
