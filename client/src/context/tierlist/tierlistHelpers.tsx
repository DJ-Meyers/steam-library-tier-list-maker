import { IGame } from "../../Types";

export const sortByPlaytimeDesc = (games: IGame[]): IGame[] => {
    return games.sort((a: IGame, b: IGame) => b.playtime_forever - a.playtime_forever)
}

export const darken = (color: string): string => {
    const r = color.slice(1, 3), g = color.slice(3, 5), b = color.slice(5, 7); 

    return `rgba(${hexToDecimal(r)}, ${hexToDecimal(g)}, ${hexToDecimal(b)}, 75%)`;
}

const hexToDecimal = (hex: string): number => hex.length === 2 ? parseInt(hex, 16) : 0;

export const baseColors = {
    orange: "#FF8C00",
    purple: "#9400D3",
    blue: "#0000CD",
    green: "#008000",
    gray: "#696969",
    red: "B22222"
}