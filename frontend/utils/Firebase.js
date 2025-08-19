import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginquickcart.firebaseapp.com",
  projectId: "loginquickcart",
  storageBucket: "loginquickcart.firebasestorage.app",
  messagingSenderId: "927431340309",
  appId: "1:927431340309:web:6bdd9d7667173aed06391c",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export{auth, provider};
