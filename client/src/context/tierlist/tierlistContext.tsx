import React, { createContext, ReactNode, useReducer } from 'react';
import { IGame, ITierlistRow } from '../../Types';
import { tierlistReducer } from './tierlistReducer';

export type TierlistState = {
    games: IGame[]
    rows: ITierlistRow[],
    dragging: IGame | null
};


const initialState: TierlistState = {
    games: [],
    rows: [
        { tierName: "S", games: [] },
        { tierName: "A", games: [] },
        { tierName: "B", games: [] },
        { tierName: "C", games: [] },
        { tierName: "D", games: [] },
    ],
    dragging: null
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