import React, { useContext, useState } from "react";
import { DROP_GAME, SET_SORT_BY } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { SortType } from "../../context/tierlist/tierlistHelpers";
import TierlistGame from "./TierlistGame";

const TierlistGames = () => {

    const { dispatch, tierlistState } = useContext(TierlistContext);
    const [isHideUnplayed, setIsHideUnplayed] = useState(false);

    const handleDrop: React.DragEventHandler = (event: React.DragEvent) => {
        event.preventDefault();
        const game = JSON.parse(event.dataTransfer.getData("text/plain"));
        const gameElement = document.getElementById(game.appid.toString());
        
        if (gameElement) {
            gameElement.classList.remove('dragging');
            dispatch({ type: DROP_GAME, payload: { target: "__games__", data: game } });
        }
    } 
    
    const handleDragOver: React.DragEventHandler = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    const setSortType: React.ChangeEventHandler = (event: React.ChangeEvent) => {
        event.preventDefault();
        if (event.target instanceof HTMLSelectElement) {
            dispatch({ type: SET_SORT_BY, payload: event.target.value });
        }
    }

    return (
        <div>
            <div className="games-header-row">
                <label>
                    <input type="checkbox" value={isHideUnplayed.toString()} onChange={(e) => setIsHideUnplayed(!isHideUnplayed)} />
                    &nbsp;Hide Unplayed
                </label>
                <h3>My Games</h3>
                <label>
                    Sort By&nbsp;
                    <select value={tierlistState.sortBy} onChange={setSortType}>
                        <option value={SortType.MostPlayed}>Most Playtime</option>
                        <option value={SortType.LeastPlayed}>Least Playtime</option> 
                        <option value={SortType.MostRecent}>Most Recently Played</option>
                        <option value={SortType.LeastRecent}>Least Recently Played</option>
                    </select>
                </label>
            </div>
            <div className="tier-list-games" onDrop={handleDrop} onDragOver={handleDragOver}>
                {tierlistState.games.map((game) => 
                    isHideUnplayed ?
                        game.playtime_forever > 0 && <TierlistGame game={game} key={game.appid} dragSource={"__games__"} /> :
                        <TierlistGame game={game} key={game.appid} dragSource={"__games__"} />
                )}
            </div>
        </div>
    )

}

export default TierlistGames;