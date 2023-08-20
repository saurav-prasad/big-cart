import { createContext, useContext } from "react";
import { useUserState } from "../UserState";
import addToSubCollection from "../../firestoreQuery/addToSubCollection";
import db from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import deleteFromSubcollection from "../../firestoreQuery/deleteFromSubcollection";
import getCollectionItems from "../../firestoreQuery/getCollectionItems";

const CartContext = createContext()


export const CartState = ({ children }) => {
    const [user, dispatch] = useUserState()

    const addCart = async (product) => {
        console.log(product);
        const targetId = product.productId;
        const foundObject = user?.cart?.find(obj => obj?.productId === targetId);
        console.log(foundObject);
        if (foundObject) {
            try {

                const updatedCart = user?.cart?.map(obj =>
                    obj.productId === targetId ? { ...obj, qnt: product?.qnt + obj.qnt } : obj
                );
                const docref = doc(db, "users", localStorage.getItem("uid"), "cart", foundObject?.id);
                await updateDoc(docref, { qnt: foundObject?.qnt + product?.qnt })
                console.log("updatedCart", updatedCart);
                console.log("wishlist from cartstate 29", user.wishList);
                dispatch({
                    ...user,
                    type: "SET_USER",
                    cart: updatedCart
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await addToSubCollection("users", "cart", product)
                const docRef = doc(db, "users", user.userDetails.uid);
                const docSnap = await getDoc(docRef);
                const updatedCart = await getCollectionItems(docSnap.data().userDetails.uid, "cart")
                // const updatedCart = [...user?.cart, product]
                console.log("wishlist from cartstate 45", user.wishList);
                console.log("newObject updatedCart  ", updatedCart);
                dispatch({
                    ...user,
                    type: "SET_USER",
                    cart: updatedCart
                })
            } catch (error) {
                console.log(error);
            }
        }

    }

    const deleteCartItem = async (product) => {
        try {
            const targetCartId = product.id
            const filteredCart = user.cart.filter(obj => obj.id !== targetCartId);
            dispatch({
                ...user,
                type: 'SET_USER',
                cart: filteredCart,
            })
            deleteFromSubcollection("users", "cart", product.id)
            // console.log(filteredCart);
        } catch (error) {
            console.log(error);
        }
    }

    const updateCart = async (product, qnt) => {
        try {

            const targetId = product.productId;

            const updatedCart = user.cart.map(obj =>
                obj.productId === targetId ? { ...obj, qnt: qnt } : obj
            );
            dispatch({
                ...user,
                type: "SET_USER",
                cart: updatedCart
            })
            const docref = await doc(db, "users", localStorage.getItem("uid"), "cart", product?.id);
            await updateDoc(docref, { qnt: qnt })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CartContext.Provider value={{ addCart, deleteCartItem, updateCart }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCartState = () => useContext(CartContext)