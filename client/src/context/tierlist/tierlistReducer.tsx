import { ADD_TIER, DROP_GAME, MOVE_TIER_DOWN, MOVE_TIER_UP, REMOVE_GAME, REMOVE_TIER, RENAME_TIER, SET_GAMES, SET_SORT_BY, SET_TIER_COLOR, START_DRAGGING_GAME } from '../dispatchTypes';
import { TierlistState } from './tierlistContext';
import { baseColors, darken, sortGames } from './tierlistHelpers';

export const tierlistReducer = (state: TierlistState, action: { type: string, payload: any }): TierlistState => {
    switch (action.type) {
        case SET_GAMES:
            return {
                ...state,
                games: sortGames(action.payload, state.sortBy),
            }
        case START_DRAGGING_GAME:
            return {
                ...state,
                dragging: action.payload.data,
                dragSource: action.payload.source,
            }
        case DROP_GAME:
            const droppedGame = action.payload.data;
            const target = action.payload.target;
            const insertIndex = action.payload.insertIndex;

            if (target === "__games__") {
                return {
                    ...state,
                    rows: [...(state.rows.map((r) => {
                        return {...r, games: r.games.filter((g) => g.appid !== droppedGame.appid)}
                    }))],
                    games: sortGames([...state.games, droppedGame], state.sortBy),
                    dragging: null,
                    dragSource: ''
                }
            }

            return {
                ...state,
                rows: [...(state.rows.map((r) => 
                    r.tierName === target ?
                        {
                            ...r,
                            games: insertIndex === r.games.length ?
                                [...r.games.filter((g) => g.appid !== droppedGame.appid), droppedGame] : 
                                [...r.games.filter((g) => g.appid !== droppedGame.appid).slice(0, insertIndex), droppedGame, ...r.games.filter((g) => g.appid !== droppedGame.appid).slice(insertIndex)]
                        } : {
                            ...r,
                            games: r.games.filter((g) => g.appid !== droppedGame.appid)
                        }
                    )
                )],
                games: state.games.filter((g) => g.appid !== droppedGame.appid),
                dragging: null,
                dragSource: '',
            }
        case REMOVE_GAME:
            const { removeFrom, removedGame } = action.payload;
            if (removeFrom === "__games__") {
                return {
                    ...state,
                    games: state.games.filter((g) => g.appid !== removedGame.appid)
                }
            }

            return {
                ...state,
                games: sortGames([...state.games, removedGame], state.sortBy),
                rows: [...state.rows.map((r) => r.games.includes(removedGame) ? {
                        ...r,
                        games: r.games.filter((g) => g.appid !== removedGame.appid)
                    } : r
                )]
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
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload,
                games: [...sortGames(state.games, action.payload)]
            }
        default:
            return state;
    }
};