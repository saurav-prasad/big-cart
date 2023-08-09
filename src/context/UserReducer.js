import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

export const userInitialState = {
    user: null
}
export const actionTypes = {
    setUser: 'SET_USER',
    unsetUser: 'UNSET_USER',
}

const cart = async (uid, coll) => {
    let a = {}
    // Query a reference to a subcollection
    const querySnapshot = await getDocs(collection(db, "users", uid, coll));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
    });
    return a
}

// cart("FpEIHUAQvMP5y2rel0bAnj0TITV2", 'cart');

const userReducer = (state, action) => {
    console.log("userReducer", action);
    switch (action.type) {
        case actionTypes.setUser:
            return {
                ...state,
                userDetails: action.userDetails,
                cart: action.cart,
            }
        case actionTypes.unsetUser:
            return { user: null }
        default: return state
    }
}
export default userReducer