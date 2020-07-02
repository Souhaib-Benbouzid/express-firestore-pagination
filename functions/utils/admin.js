// ---------- admin config
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//----------- database
const db = admin.firestore();

// ------ Firebase configuration
const firebaseConfig = require("./firbaseConfig");
// Initialize Firebase
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

module.exports = {
  admin,
  db,
  firebase,
};
