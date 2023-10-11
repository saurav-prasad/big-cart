import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const googleLogin = async () => {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userDetail = result.user;

        return userDetail;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to propagate it further if needed.
    }
};

export default googleLogin