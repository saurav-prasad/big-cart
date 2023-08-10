import { createContext, useContext, useReducer } from "react";

const ProductContext = createContext()

export const ProductState = ({ reducer, initialState, children }) => {
    return (
        <ProductContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductState = () => useContext(ProductContext)