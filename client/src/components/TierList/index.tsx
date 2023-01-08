import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { SET_GAMES } from "../../context/dispatchTypes";
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
    useEffect(() => {
        setIsLoading(true);
        fetchGames();
        // eslint-disable-next-line
    }, []);

    if (isLoading) return(<div>Fetching data from Steam...</div>)

    return (
        <div id="tier-list">
            <div className="tier-list-rows">
                {tierlistState.rows.map((row, rowIndex) =>
                    <TierlistRow row={row} key={rowIndex} />
                )}
                <div className="add-row-btn">+ Add Row</div>
            </div>
            <h3>My Games</h3>
            <div className="tier-list-games">
                {tierlistState.games.map((game, gameIndex) => 
                    <TierlistGame game={game} key={gameIndex} />
                )}
            </div>
        </div>
    );
};

export default TierList;