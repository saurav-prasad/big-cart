export const sellerInitialState = {
    seller: null
}
export const actionTypes = {
    setSeller: 'SET_SELLER',
    unsetSeller: 'UNSET_SELLER',
}

const sellerReducer = (state, action) => {
   console.log(action);
    switch (action.type) {
        case actionTypes.setSeller:
            return {
                ...state,
                sellerDetails: action?.sellerDetails,
                sellerProducts: action?.sellerProducts,
                sellerOrders: action?.sellerOrders,
            }
        case actionTypes.unsetSeller:
            return { seller: null }
        default: return state
    }
}
export default sellerReducer
