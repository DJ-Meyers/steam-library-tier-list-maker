import React, { useContext, useRef } from "react";
import { DROP_GAME } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { IGame, ITierlistRow } from "../../Types";
import TierlistGame from "./TierlistGame";

type TierlistRowGamesProps = {
    row: ITierlistRow
}

const TierlistRowGames = ({ row }: TierlistRowGamesProps) => {
    const { dispatch } = useContext(TierlistContext);
    const ref = useRef<HTMLDivElement>(null);

    const handleDrop: React.DragEventHandler = (event: React.DragEvent) => {
        event.preventDefault();
        const game = JSON.parse(event.dataTransfer.getData("text/plain"));
        const gameElement = document.getElementById(game.appid.toString());

        let insertIndex = 0;
        if (row.games.length) {
            const eventX = event.clientX, eventY = event.clientY;
            const offsetLeft = ref.current?.offsetLeft ?? 0, offsetTop = ref.current?.offsetTop ?? 0;
            
            const relativeOffsetLeft = eventX - offsetLeft;
            const relativeOffsetTop = eventY - offsetTop;

            const gameRow = Math.floor(relativeOffsetTop / 120);
            const gameRowLength = Math.floor((ref.current?.clientWidth ?? 0) / 110);
            const positionWithinGameRow = Math.floor(relativeOffsetLeft / 110);
            insertIndex = Math.min(row.games.length, gameRowLength * gameRow + positionWithinGameRow);
        }
        
        if (gameElement) {
            gameElement.classList.remove('dragging');
            dispatch({ type: DROP_GAME, payload: { target: row.tierName, data: game, insertIndex }})
        }
    }
    
    const handleDragOver: React.DragEventHandler = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    return (
        <div className="tier-list-row-games" ref={ref} id={`${row.tierName}-games`} onDrop={handleDrop} onDragOver={handleDragOver} >
            {row.games.map((game: IGame) =>
                <TierlistGame game={game} key={game.appid} dragSource={row.tierName} />
            )}
        </div>
    )
}

export default TierlistRowGames;