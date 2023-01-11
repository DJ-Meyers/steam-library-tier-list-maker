import React, { useContext, useState } from "react";
import { DROP_GAME, REMOVE_TIER, RENAME_TIER } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { IGame, ITierlistRow } from "../../Types";
import TierlistGame from "./TierlistGame";

type TierlistRowProps = {
    row: ITierlistRow
}

const TierlistRow = ({ row }: TierlistRowProps) => {

    const [isEditingTierName, setIsEditingTierName] = useState(false);
    const [tierName, setTierName] = useState(row.tierName);

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

    const startEditing = () => {
        setIsEditingTierName(true);
    }

    const changeTierName: React.FocusEventHandler = (event: React.FocusEvent) => {
        event.preventDefault();
        dispatch({ type: RENAME_TIER, payload: { oldName: row.tierName, newName: tierName } });
        setIsEditingTierName(false);
    }

    const removeTier = () => {
        dispatch({ type: REMOVE_TIER, payload: row.tierName });
    }

    return (
        <div className="tier-list-row" id={`${row.tierName}-row`} >
            <div className="tier-list-row-header" id={`${row.tierName}-header`}>
                <button className="remove-tier-btn" onClick={removeTier}>&times;</button>
                {isEditingTierName ?
                    (
                        <input autoFocus type="text" placeholder={row.tierName} value={tierName}
                            onChange={(e) => setTierName(e.target.value)}
                            onBlur={changeTierName}
                            onKeyUp={(e) => e.target instanceof HTMLInputElement && e.key === "Enter" && e.target.blur()}
                        />
                    ) : (
                        <span className="tier-name" onClick={startEditing}>
                            {row.tierName}
                        </span>
                    )
                }
            </div>
            <div className="tier-list-row-games" id={`${row.tierName}-games`} onDrop={handleDrop} onDragOver={handleDragOver} >
                {row.games.map((game: IGame) =>
                    <TierlistGame game={game} key={game.appid} dragSource={row.tierName} />
                )}
            </div>
        </div>
    );
}

export default TierlistRow