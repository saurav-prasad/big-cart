export const userInitialState = {
    user: null
}
export const actionTypes = {
    setUser: 'SET_USER',
    unsetUser: 'UNSET_USER',
}
const userReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.setUser:
            return { ...state, user: action.user, }
        case actionTypes.unsetUser:
            return { user: null }
        default: return state
    }
}
export default userReducer