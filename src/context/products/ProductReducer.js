export const productInitialState = {
    products: null
}

export const actionTypes = {
    setProduct: "SET_PRODUCT",
    unsetProduct: 'UNSET_PRODUCT'
}
const productReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.setProduct:
            return { ...state, products: action.products }
        case actionTypes.unsetProduct:
            return { products: null }
        default: return state
    }
}
export default productReducer