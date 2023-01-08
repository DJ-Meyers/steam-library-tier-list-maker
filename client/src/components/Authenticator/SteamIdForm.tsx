import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { SET_STEAM_ID } from "../../context/dispatchTypes";

const SteamIdForm = () => {

    const { dispatch } = useContext(AuthContext);

    const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.preventDefault();
        const steamId = (document.getElementById("steam-id-input") as HTMLInputElement)?.value;
        dispatch({ type: SET_STEAM_ID, payload: steamId });
    }

    return (
        <form id="steam-id-form">
            <label>Steam ID</label>
            <div className="input-container">
                <input id="steam-id-input" placeholder="Please Enter Your Steam ID" />
                <input id="steam-id-form-submit-btn" type="submit" onClick={handleSubmit} value="Submit"/>
            </div>
            <div className="steam-id-form-hint">Your steam profile must be set to public to use this option</div>
        </form>
    );
}

export default SteamIdForm;