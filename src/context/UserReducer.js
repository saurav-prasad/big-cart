export const userInitialState = {
    user: null
}
export const actionTypes = {
    setUser: 'SET_USER',
    unsetUser: 'UNSET_USER',
}

const userReducer = (state, action) => {
   console.log(action);
    switch (action.type) {
        case actionTypes.setUser:
            return {
                ...state,
                userDetails: action?.userDetails,
                cart: action?.cart,
                wishList: action?.wishList,
            }
        case actionTypes.unsetUser:
            return { user: null }
        default: return state
    }
}
export default userReducer