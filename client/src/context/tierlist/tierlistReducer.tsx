import { IGame } from '../../Types';
import { SET_GAMES } from '../dispatchTypes';
import { TierlistState } from './tierlistContext';

export const tierlistReducer = (state: TierlistState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case SET_GAMES:
            return {
                ...state,
                games: action.payload.sort((a: IGame, b: IGame) => a.playtime_forever < b.playtime_forever),
            }
        default:
            return state;
    }
};