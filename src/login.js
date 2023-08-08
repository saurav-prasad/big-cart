import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import db from "./firebase";
const googleLogin = async () => {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userDetail = result.user;

        return userDetail;
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        // Handle the error as needed.
        throw error; // Re-throw the error to propagate it further if needed.
    }
};

export default googleLogin