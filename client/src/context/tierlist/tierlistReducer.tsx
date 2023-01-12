import { ADD_TIER, DROP_GAME, MOVE_TIER_DOWN, MOVE_TIER_UP, REMOVE_TIER, RENAME_TIER, SET_GAMES, SET_TIER_COLOR, START_DRAGGING_GAME } from '../dispatchTypes';
import { TierlistState } from './tierlistContext';
import { baseColors, darken, sortByPlaytimeDesc } from './tierlistHelpers';

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
                games: [],
                color: darken(baseColors.red),
                hoverColor: baseColors.red,
            }
            
            return {
                ...state,
                rows: [
                    ...state.rows,
                    newTier
                ]
            }
        case REMOVE_TIER:
            const removedTier = action.payload;

            return {
                ...state,
                rows: [...(state.rows.filter((r) => r !== removedTier))]
            }
        case MOVE_TIER_UP:
            const moveUpInitialIndex = state.rows.indexOf(action.payload);

            if (moveUpInitialIndex <= 0) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                rows: [...state.rows.slice(0, moveUpInitialIndex - 1), action.payload, state.rows[moveUpInitialIndex-1], ...state.rows.slice(moveUpInitialIndex + 1)]
            }
        case MOVE_TIER_DOWN:
            const moveDownInitialIndex = state.rows.indexOf(action.payload);

            if (moveDownInitialIndex === -1 || moveDownInitialIndex >= state.rows.length - 1) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                rows: [...state.rows.slice(0, moveDownInitialIndex), state.rows[moveDownInitialIndex+1], action.payload, ...state.rows.slice(moveDownInitialIndex + 2)]
            }
        case SET_TIER_COLOR:
            const newColor = action.payload.color;
            const hexRegex = new RegExp("^#([A-Fa-f0-9]{6})$");

            if (!hexRegex.test(newColor)) {
                return {
                    ...state
                }
            }

            return {
                ...state,
                rows: [...(state.rows.map((r) => r !== action.payload.row ?
                    r : {
                        ...r,
                        color: darken(newColor),
                        hoverColor: newColor
                    }))]
            }
        default:
            return state;
    }
};