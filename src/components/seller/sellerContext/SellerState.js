import { createContext, useContext, useReducer } from "react";

const SellerContext = createContext();

export const SellerState = ({ reducer, initialState, children }) => {
    return (
        <SellerContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </SellerContext.Provider>
    )
}
export const useSellerState = () => useContext(SellerContext)