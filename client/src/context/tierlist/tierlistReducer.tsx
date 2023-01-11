import { ADD_TIER, DROP_GAME, REMOVE_TIER, RENAME_TIER, SET_GAMES, START_DRAGGING_GAME } from '../dispatchTypes';
import { TierlistState } from './tierlistContext';
import { sortByPlaytimeDesc } from './tierlistHelpers';

export const tierlistReducer = (state: TierlistState, action: { type: string, payload: any }): TierlistState => {
    switch (action.type) {
        case SET_GAMES:
            return {
                ...state,
                games: sortByPlaytimeDesc(action.payload),
            }
        case START_DRAGGING_GAME:
            return {
                ...state,
                dragging: action.payload.data,
                dragSource: action.payload.source,
            }
        case DROP_GAME:
            const game = action.payload.data;
            const target = action.payload.target;

            if (target === state.dragSource) {
                return {
                    ...state
                }
            }

            if (target === "__games__") {
                return {
                    ...state,
                    rows: [...(state.rows.map((r) => {
                        return {...r, games: r.games.filter((g) => g.appid !== game.appid)}
                    }))],
                    games: sortByPlaytimeDesc([...state.games, game]),
                    dragging: null,
                    dragSource: ''
                }
            }
            // Remove 
            return {
                ...state,
                rows: [...(state.rows.map((r) => 
                    r.tierName === target ?
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
                dragging: null,
                dragSource: '',
            }
        case RENAME_TIER:
            const newName = action.payload.newName;
            const oldName = action.payload.oldName;

            if (oldName === newName
                || newName === ""
                || newName === "__games__"
                || state.rows.map((r) => r.tierName).includes(newName)
            ) {
                return {
                    ...state
                }
            }

            return {
                ...state,
                rows: [...(state.rows.map((r) => 
                    r.tierName === oldName ?
                        {
                            ...r,
                            tierName: newName
                        } : r
                    )
                )],
            }
        case ADD_TIER: 
            
            const newTier = {
                tierName: "Tier " + (state.rows.length + 1),
                games: []
            }
            
            return {
                ...state,
                rows: [
                    ...state.rows,
                    newTier
                ]
            }
        case REMOVE_TIER:
            const removedTierName = action.payload;

            return {
                ...state,
                rows: [...(state.rows.filter((r) => r.tierName !== removedTierName))]
            }
        default:
            return state;
    }
};