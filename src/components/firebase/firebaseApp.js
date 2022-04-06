// import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// const db = getFirestore();

const firebaseConfig = {
  apiKey: "AIzaSyC8NFr4ItJX48Ns3YSCsy3dL_YPqVw8bWM",
  authDomain: "twitter-clone-66b0f.firebaseapp.com",
  projectId: "twitter-clone-66b0f",
  storageBucket: "twitter-clone-66b0f.appspot.com",
  messagingSenderId: "992426590412",
  appId: "1:992426590412:web:c8bad3aad86a0431cc8269"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

//  enableIndexedDbPersistence(db)
//   .catch((err) => {
//       if (err.code === 'failed-precondition') {
//           // Multiple tabs open, persistence can only be enabled
//           // in one tab at a a time.
//           // ...
//           console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
//       } else if (err.code === 'unimplemented') {
//           // The current browser does not support all of the
//           // features required to enable persistence
//           // ...
//           console.log('The current browser does not support all of the features required to enable persistence');
//       }
//   });