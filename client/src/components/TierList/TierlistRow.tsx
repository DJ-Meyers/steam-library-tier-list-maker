import React from "react";
import { ITierlistRow } from "../../Types";
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