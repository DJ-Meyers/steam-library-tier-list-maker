import { IGame } from "../../Types";


export const darken = (color: string): string => {
    const r = color.slice(1, 3), g = color.slice(3, 5), b = color.slice(5, 7); 
    const rgb = [r, g, b]
    const output = "#" + rgb.map((hex) => hexToDecimal(hex)).map((dec) => decimalToHex(.75 * dec)).join("");
    return output;
}

const hexToDecimal = (hex: string): number => hex.length === 2 ? parseInt(hex, 16) : 0;

const decimalToHex = (dec: number): string => (dec < 16 ? "0" : "") + Math.round((dec)).toString(16).toUpperCase();

export const baseColors = {
    orange: "#FF8C00",
    purple: "#9400D3",
    blue: "#0000CD",
    green: "#008000",
    gray: "#696969",
    red: "B22222"
}

export enum SortType {
    MostPlayed = 0,
    LeastPlayed = 1,
    MostRecent = 2,
    LeastRecent = 3
}

export const sortGames = (games: IGame[], sortBy: SortType): IGame[] => {
    switch (+sortBy) {
        case 0:
            return games.sort((a: IGame, b: IGame) => b.playtime_forever - a.playtime_forever)
        case 1:
            return games.sort((a: IGame, b: IGame) => a.playtime_forever - b.playtime_forever);
        case 2:
            return games.sort((a: IGame, b: IGame) => b.rtime_last_played - a.rtime_last_played)
        case 3:
            return games.sort((a: IGame, b: IGame) => a.rtime_last_played - b.rtime_last_played)
        default:
            return games;

    }
}
