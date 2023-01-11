import React, { useContext, useState } from "react";
import { DROP_GAME } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { IGame, ITierlistRow } from "../../Types";
import TierlistGame from "./TierlistGame";
import TierlistRowGames from "./TierlistRowGames";
import TierlistRowHeader from "./TierlistRowHeader";

type TierlistRowProps = {
    row: ITierlistRow,
    index: number
}

const TierlistRow = ({ row, index }: TierlistRowProps) => {
    return (
        <div className="tier-list-row" id={`${row.tierName}-row`} >
            <TierlistRowHeader row={row} index={index} />
            <TierlistRowGames row={row} />
        </div>
    );
}

export default TierlistRow