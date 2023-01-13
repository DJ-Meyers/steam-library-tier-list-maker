import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { ADD_TIER, SET_GAMES } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import TierlistGames from "./TierlistGames";
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
            <TierlistGames />
        </div>
    );
};

export default TierList;