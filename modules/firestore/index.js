const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://your-project-id.firebaseio.com' // Replace with your database URL
});

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// auth
// const auth = authmodule.getAuth(app)
// auth.languageCode = 'it'
// // if (import.meta.env.MODE != 'production') {
//   authmodule.connectAuthEmulator(auth, 'http://127.0.01:9099')
// // }
// module.exports = {
//   app
// }