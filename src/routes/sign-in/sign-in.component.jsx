import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

export const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  
  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    },
    []
  );
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Logar com o google</button>
      <button onClick={signInWithGoogleRedirect}>
        Logar com o Google Redirect
      </button>
    </div>
  );
};
