import React, { useContext, useState } from "react";
import { MOVE_TIER_DOWN, MOVE_TIER_UP, REMOVE_TIER, RENAME_TIER, SET_TIER_COLOR } from "../../context/dispatchTypes";
import { TierlistContext } from "../../context/tierlist/tierlistContext";
import { ITierlistRow } from "../../Types";

type TierlistRowHeaderProps = {
    row: ITierlistRow,
    index: number
}

const TierlistRowHeader = ({ row, index }: TierlistRowHeaderProps) => {


    const [isHoveringTierHeader, setIsHoveringTierHeader] = useState(false);

    const [isEditingTierName, setIsEditingTierName] = useState(false);
    const [tierName, setTierName] = useState(row.tierName);

    const [isEditingTierColor, setIsEditingTierColor] = useState(false);
    const [tierColor, setTierColor] = useState(row.hoverColor);
    
    const { tierlistState, dispatch } = useContext(TierlistContext);

    const startEditingTierName = () => {
        setIsEditingTierName(true);
        setIsEditingTierColor(false);
    }

    const changeTierName: React.FocusEventHandler = (event: React.FocusEvent) => {
        event.preventDefault();
        dispatch({ type: RENAME_TIER, payload: { oldName: row.tierName, newName: tierName } });
        setIsEditingTierName(false);
    }

    const removeTier = (): void => {
        dispatch({ type: REMOVE_TIER, payload: row });
    }

    const moveTierUp = (): void => {
        dispatch({ type: MOVE_TIER_UP, payload: row });
    }

    const moveTierDown = (): void => {
        dispatch({ type: MOVE_TIER_DOWN, payload: row });
    }

    const onMouseEnter: React.MouseEventHandler = (event: React.MouseEvent) => {
        setIsHoveringTierHeader(true);
    }
    
    const onMouseLeave: React.MouseEventHandler = (event: React.MouseEvent) => {
        setIsHoveringTierHeader(false);
    }

    const startEditingTierColor = () => {
        setIsEditingTierColor(true);
        setIsEditingTierName(false);
    }

    const changeTierColor: React.FocusEventHandler = (event: React.FocusEvent) => {
        event.preventDefault();
        dispatch({ type: SET_TIER_COLOR, payload: { row, color: tierColor } });
        setIsEditingTierColor(false);
    }

    return (
        <div className="tier-list-row-header" id={`${row.tierName}-header`}
            style={{ backgroundColor: isHoveringTierHeader ? row.hoverColor : row.color }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <button className="remove-tier-btn" onClick={removeTier}>&times;</button>
            {isEditingTierColor ?
                (
                    <input type="color" autoFocus className="change-tier-color-input"
                        value={tierColor}
                        onChange={(e) => setTierColor(e.target.value)}
                        onBlur={changeTierColor}
                    />
                ) : (
                    <button className="change-tier-color-btn" onClick={startEditingTierColor}>&#127912;</button>
                )
            }
            {index > 0 ?
                (
                    <button className="move-tier-up-btn" onClick={moveTierUp} >&#8963;</button>
                ) : (
                    <button className="move-tier-up-btn" style={{ visibility: "hidden" }} >&#8963;</button>
                )
            }
            {isEditingTierName ?
                (
                    <input className="change-tier-name-input" autoFocus type="text" placeholder={row.tierName} value={tierName}
                        onChange={(e) => setTierName(e.target.value)}
                        onBlur={changeTierName}
                        onKeyUp={(e) => e.target instanceof HTMLInputElement && e.key === "Enter" && e.target.blur()}
                    />
                ) : (
                    <span className="tier-name" onClick={startEditingTierName}>
                        {row.tierName}
                    </span>
                )
            }
            {index < tierlistState.rows.length - 1 ? <button className="move-tier-down-btn" onClick={moveTierDown} >&#8963;</button> : <button className="move-tier-down-btn" style={{visibility: "hidden"}} >&#8963;</button>}
        </div>
    )
}

export default TierlistRowHeader;