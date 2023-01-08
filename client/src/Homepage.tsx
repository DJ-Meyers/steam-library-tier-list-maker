import React, { useContext } from "react";
import Authenticator from './components/Authenticator';
import TierList from './components/TierList';
import { AuthContext } from "./context/auth/authContext";

const Homepage = () => {

    const { authState } = useContext(AuthContext);

    return (
        <div className="App">
            <h1>My Games Tier List</h1>
            {authState.steamId ?
                <TierList /> : 
                <Authenticator />
            }
        </div>
    )
}

export default Homepage;