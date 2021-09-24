import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";




// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjMoPxWQzV3LEF4oAzWut_X3ijJy3kDlU",
  authDomain: "wells-firegram-131f8.firebaseapp.com",
  projectId: "wells-firegram-131f8",
  storageBucket: "wells-firegram-131f8.appspot.com",
  messagingSenderId: "536959412773",
  appId: "1:536959412773:web:42aa4bb67195de7b9aadcc",
  measurementId: "G-J6J103KBM7"
};

// Initialize Firebase
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const projectStorage = getStorage(app)


export {projectStorage, db}