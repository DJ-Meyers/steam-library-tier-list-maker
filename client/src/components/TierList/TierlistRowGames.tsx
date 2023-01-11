import React, { useContext } from "react";
import { DROP_GAME } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { IGame, ITierlistRow } from "../../Types";
import TierlistGame from "./TierlistGame";

type TierlistRowGamesProps = {
    row: ITierlistRow
}

const TierlistRowGames = ({ row }: TierlistRowGamesProps) => {
    const { dispatch } = useContext(TierlistContext);

    const handleDrop: React.DragEventHandler = (event: React.DragEvent) => {
        event.preventDefault();
        const game = JSON.parse(event.dataTransfer.getData("text/plain"));
        const gameElement = document.getElementById(game.appid.toString());
        
        if (gameElement) {
            gameElement.classList.remove('dragging');
            dispatch({ type: DROP_GAME, payload: { target: row.tierName, data: game }})
        }
    }
    
    const handleDragOver: React.DragEventHandler = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    return (
        <div className="tier-list-row-games" id={`${row.tierName}-games`} onDrop={handleDrop} onDragOver={handleDragOver} >
            {row.games.map((game: IGame) =>
                <TierlistGame game={game} key={game.appid} dragSource={row.tierName} />
            )}
        </div>
    )
}

export default TierlistRowGames;