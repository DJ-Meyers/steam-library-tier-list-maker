import React, { createContext, ReactNode, useReducer } from 'react';
import { IGame, ITierlistRow } from '../../Types';
import { baseColors, darken, SortType } from './tierlistHelpers';
import { tierlistReducer } from './tierlistReducer';

export type TierlistState = {
    games: IGame[]
    rows: ITierlistRow[],
    dragging: IGame | null,
    dragSource: string,
    sortBy: SortType
};

const { orange, purple, blue, green, gray } = baseColors;

const initialState: TierlistState = {
    games: [],
    rows: [
        { tierName: "S", games: [], color: darken(orange), hoverColor: orange },
        { tierName: "A", games: [], color: darken(purple), hoverColor: purple },
        { tierName: "B", games: [], color: darken(blue), hoverColor: blue },
        { tierName: "C", games: [], color: darken(green), hoverColor: green },
        { tierName: "D", games: [], color: darken(gray), hoverColor: gray },
    ],
    dragging: null,
    dragSource: '',
    sortBy: SortType.MostPlayed
};

const TierlistContext = createContext<{
    tierlistState: TierlistState,
    dispatch: React.Dispatch<any>
}>({ tierlistState: initialState, dispatch: () => null });

const TierlistProvider: React.FC<{ children: ReactNode[] | ReactNode }> = ({ children }) => {
    const [tierlistState, dispatch] = useReducer(tierlistReducer, initialState);

    return (
        <TierlistContext.Provider value={{ tierlistState, dispatch }}>
            {children}
        </TierlistContext.Provider>
    )
}

export { TierlistContext, TierlistProvider };