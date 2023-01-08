import { SET_STEAM_ID } from '../dispatchTypes';
import { AuthState } from './authContext';

export const authReducer = (state: AuthState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case SET_STEAM_ID:
            return {
                ...state,
                steamId: action.payload
            }
        default:
            return state;
    }
};