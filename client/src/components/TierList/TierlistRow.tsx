import React from "react";
import { IGame, ITierlistRow } from "../../Types";

type TierlistRowProps = {
    row: ITierlistRow
}

const TierlistRow = ({ row }: TierlistRowProps) => {
    return (
        <div className="tier-list-row">
            <div className="tier-list-row-header">
                <div className="tier-list-row-name">
                    {row.tierName}
                </div>
            </div>
            <div className="tier-list-row-games">
                {row.games.map((game: IGame, gameIndex) =>
                    <div key={gameIndex} className="tier-list-game">
                        {game.name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TierlistRow