import { createContext, useContext } from "react";
import { useUserState } from "../UserState";
import addToSubCollection from "../../firestoreQuery/addToSubCollection";
import db from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import deleteFromSubcollection from "../../firestoreQuery/deleteFromSubcollection";

const WishListContext = createContext()


export const WishListState = ({ children }) => {
    const [user, dispatch] = useUserState()

    const addWish = async (product) => {
        const updatedCart = [...user.wishList, product]
        console.log("newObject", updatedCart);
        dispatch({
            ...user,
            type: "SET_USER",
            wishList: updatedCart
        })
        await addToSubCollection("users", "wishList", product)
    }

    const deleteWishItem = async (product) => {
        const targetCartId = product.productId
        const filteredCart = user.wishList.filter(obj => obj.productId !== targetCartId);
        dispatch({
            ...user,
            type: 'SET_USER',
            wishList: filteredCart,
        })
        deleteFromSubcollection("users", "wishList", product.id)
        // console.log(filteredCart);
    }

    return (
        <WishListContext.Provider value={{ addWish, deleteWishItem }}>
            {children}
        </WishListContext.Provider>
    )
}


export const useWishListState = () => useContext(WishListContext)