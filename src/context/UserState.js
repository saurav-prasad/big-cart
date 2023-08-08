import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

export const UserState = ({ reducer, initialState, children }) => {
    return (
        <UserContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </UserContext.Provider>
    )
}
export const useUserState = () => useContext(UserContext)