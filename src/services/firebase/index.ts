import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAthMyX_QO7NnfrfuqQM7bFlm31APbu6hc',
  authDomain: 'mchat-3b402.firebaseapp.com',
  databaseURL: 'https://mchat-3b402.firebaseio.com',
  projectId: 'mchat-3b402',
  storageBucket: 'mchat-3b402.appspot.com',
  messagingSenderId: '49126543683'
}

firebase.initializeApp(config)

export default firebase
