import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA_VPea_qaXZ6ssr6_UqVvgSU74Fx1jmU8",
  authDomain: "crwn-clothing-db-bc309.firebaseapp.com",
  projectId: "crwn-clothing-db-bc309",
  storageBucket: "crwn-clothing-db-bc309.appspot.com",
  messagingSenderId: "546634106362",
  appId: "1:546634106362:web:bfe38b6c5fd697b7899043",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log("userDocRef", userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    
    if(!userSnapshot.exists()){
      const {displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
}