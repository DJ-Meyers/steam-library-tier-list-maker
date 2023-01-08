import React, { createContext, ReactNode, useReducer } from 'react';
import { authReducer } from './authReducer';

export type AuthState = {
    steamId: string;
};


const initialState: AuthState = {
    steamId: ""
};

const AuthContext = createContext<{
    authState: AuthState,
    dispatch: React.Dispatch<any>
}>({ authState: initialState, dispatch: () => null });

const AuthProvider: React.FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };