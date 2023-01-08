import React from "react";
import SteamIdForm from "./SteamIdForm";

const Authenticator = () => {
    return (
        <div id='authenticator'>
            {/* <h3>Please login or enter your Steam ID</h3> */}
            <div className='auth-options'>
                <SteamIdForm />
                {/* <SteamAuthenticator /> */}
            </div>
        </div>
    );
}

export default Authenticator;