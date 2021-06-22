import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyBrQ8_lGYtL6qzo59DcNa2qtK4sxWJ6iRE',
  authDomain: 'alxa-ml.firebaseapp.com',
  projectId: 'alxa-ml',
  storageBucket: 'alxa-ml.appspot.com',
  messagingSenderId: '19384697996',
  appId: '1:19384697996:web:8652041ecba4070e3427a9',
  measurementId: 'G-GXXNLMM0GM'
}

firebase.initializeApp(firebaseConfig)

export const messaging = firebase.messaging()

export const getToken = (token) => messaging.getToken(token)
