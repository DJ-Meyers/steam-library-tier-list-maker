import React, { DragEventHandler, useContext } from "react";
import { START_DRAGGING_GAME } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { IGame } from "../../Types";

const TierlistGame = ({ game }: { game: IGame }) => {

    const { dispatch } = useContext(TierlistContext);

    const dragHandler: DragEventHandler = (event: React.DragEvent) => {
        dispatch({ type: START_DRAGGING_GAME, payload: game });
        event.dataTransfer.setData("text/plain", JSON.stringify(game));
        event.dataTransfer.effectAllowed = "move";
        document.getElementById(game.appid.toString())?.classList.add("dragging");
    }

    const imgUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
    return (
        <div className="tier-list-game" id={`${game.appid}`} draggable="true" onDragStart={dragHandler} >
            <img alt={game.name + " logo"} width={100} height={100} src={imgUrl} />
            <span>{game.name}</span>
        </div>
    );
}

export default TierlistGame;