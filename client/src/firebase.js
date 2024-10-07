import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAR2ylMpAVwATis5KU9eDcNzJ6dcUW5PEU",
  authDomain: "realestate-app-2ade7.firebaseapp.com",
  projectId: "realestate-app-2ade7",
  storageBucket: "realestate-app-2ade7.appspot.com",
  messagingSenderId: "615354670307",
  appId: "1:615354670307:web:abc0ebc437d8fa617779d6",
  measurementId: "G-0WFZM48C1K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();











