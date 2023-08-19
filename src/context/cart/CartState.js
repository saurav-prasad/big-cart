import { createContext, useContext } from "react";
import { useUserState } from "../UserState";
import addToSubCollection from "../../firestoreQuery/addToSubCollection";
import db from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import deleteFromSubcollection from "../../firestoreQuery/deleteFromSubcollection";

const CartContext = createContext()


export const CartState = ({ children }) => {
    const [user, dispatch] = useUserState()

    const addCart = async (product) => {
        const targetId = product.productId;
        const foundObject = user.cart.find(obj => obj.productId === targetId);

        if (foundObject) {
            const updatedCart = user.cart.map(obj =>
                obj.productId === targetId ? { ...obj, qnt: product.qnt + obj.qnt } : obj
            );
            console.log("updatedObject", updatedCart);
            console.log("foundObject", foundObject);
            dispatch({
                ...user,
                type: "SET_USER",
                cart: updatedCart
            })
            const docref =  doc(db, "users", localStorage.getItem("uid"), "cart", foundObject?.id);
            await updateDoc(docref, { qnt: foundObject.qnt + product.qnt })
        } else {
            const updatedCart = [...user.cart, product]
            console.log("newObject", updatedCart);
            dispatch({
                ...user,
                type: "SET_USER",
                cart: updatedCart
            })
            await addToSubCollection("users", "cart", product)
        }

    }

    const deleteCartItem = async (product) => {
        const targetCartId = product.productId
        const filteredCart = user.cart.filter(obj => obj.productId !== targetCartId);
        dispatch({
            ...user,
            type: 'SET_USER',
            cart: filteredCart,
        })
        deleteFromSubcollection("users", "cart", product.id)
        // console.log(filteredCart);
    }

    const updateCart = async (product, qnt) => {
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
    }

    return (
        <CartContext.Provider value={{ addCart, deleteCartItem, updateCart }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCartState = () => useContext(CartContext)