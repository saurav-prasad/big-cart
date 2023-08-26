import { createContext, useContext } from "react";
import { useUserState } from "../UserState";
import addToSubCollection from "../../firestoreQuery/addToSubCollection";
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import deleteFromSubcollection from "../../firestoreQuery/deleteFromSubcollection";
import getCollectionItems from "../../firestoreQuery/getCollectionItems";
import { useCartState } from "../cart/CartState";

const WishListContext = createContext()


export const WishListState = ({ children }) => {
    const [user, dispatch] = useUserState()
    const { addCart } = useCartState()
    const addWish = async (product) => {
        console.log(product);
        const targetId = product.productId;
        const foundObject = user?.wishList?.find(obj => obj?.productId === targetId);
        try {
            console.log(!foundObject);
            if (!foundObject) {
                const docRef = doc(db, "users", user.userDetails.uid);
                const docSnap = await getDoc(docRef);
                await addToSubCollection("users", user.userDetails.uid, "wishList", product)
                const updatedCart = await getCollectionItems(docSnap.data().userDetails.uid, "wishList")
                // console.log("newObject", updatedCart);
                updatedCart && dispatch({
                    ...user,
                    type: "SET_USER",
                    wishList: updatedCart
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWishItem = async (product) => {
        try {
            console.log("deleteWishItem state->", product);
            const targetCartId = product?.productId
            const filteredCart = user?.wishList?.filter(obj => obj?.productId !== targetCartId);
            await deleteFromSubcollection("users", "wishList", product.id)
            console.log("wishfilteredCart", filteredCart);
            dispatch({
                ...user,
                type: 'SET_USER',
                wishList: filteredCart,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WishListContext.Provider value={{ addWish, deleteWishItem }}>
            {children}
        </WishListContext.Provider>
    )
}


export const useWishListState = () => useContext(WishListContext)