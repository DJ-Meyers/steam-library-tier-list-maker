import { IGame } from '../../Types';
import { DROP_GAME, SET_GAMES, START_DRAGGING_GAME } from '../dispatchTypes';
import { TierlistState } from './tierlistContext';

export const tierlistReducer = (state: TierlistState, action: { type: string, payload: any }): TierlistState => {
    switch (action.type) {
        case SET_GAMES:
            return {
                ...state,
                games: action.payload.sort((a: IGame, b: IGame) => a.playtime_forever < b.playtime_forever),
            }
        case START_DRAGGING_GAME:
            return {
                ...state,
                dragging: action.payload,
            }
        case DROP_GAME:
            const game = action.payload.data;
            const tierName = action.payload.target;

            // Remove 
            return {
                ...state,
                rows: [...(state.rows.map((r) => 
                    r.tierName === tierName ?
                        {
                            ...r,
                            games: [...r.games, game]
                        } : {
                            ...r,
                            games: r.games.filter((g) => g.appid !== game.appid)
                        }
                    )
                )],
                games: state.games.filter((g) => g.appid !== game.appid),
                dragging: null
            }
        default:
            return state;
    }
};