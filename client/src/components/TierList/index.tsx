import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { ADD_TIER, DROP_GAME, SET_GAMES } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import TierlistGame from "./TierlistGame";
import TierlistRow from "./TierlistRow";

const TierList = () => {

    const { authState } = useContext(AuthContext);
    const { dispatch, tierlistState } = useContext(TierlistContext);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGames = async () => {
        const steamId = authState.steamId;
        const resp: AxiosResponse = await axios.get(`/api/gamesList/${steamId}`);
        const games = resp.data.response.games;
        
        dispatch({ type: SET_GAMES, payload: games });
        setIsLoading(false);
    }

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

    const addTier = () => {
        dispatch({ type: ADD_TIER, payload: {} });
    }

    useEffect(() => {
        setIsLoading(true);
        fetchGames();
        // eslint-disable-next-line
    }, []);

    if (isLoading) return(<div>Fetching data from Steam...</div>)

    return (
        <div id="tier-list">
            <div className="tier-list-rows">
                {tierlistState.rows.map((row, index) =>
                    <TierlistRow row={row} index={index} key={row.tierName} />
                )}
                <div className="add-row-btn" onClick={addTier}>+ Add Row</div>
            </div>
            <h3>My Games</h3>
            <div className="tier-list-games" onDrop={handleDrop} onDragOver={handleDragOver}>
                {tierlistState.games.map((game) => 
                    <TierlistGame game={game} key={game.appid} dragSource={"__games__"} />
                )}
            </div>
        </div>
    );
};

export default TierList;