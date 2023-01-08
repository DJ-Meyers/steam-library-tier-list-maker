import React from "react";
import { IGame } from "../../Types";

const TierlistGame = ({ game }: { game: IGame }) => {
    const imgUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
    return (
        <div className="tier-list-game">
            <img alt={game.name + " logo"} width={100} height={100} src={imgUrl} />
            <span>{game.name}</span>
        </div>
    );
}

export default TierlistGame;