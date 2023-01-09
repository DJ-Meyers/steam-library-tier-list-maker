import { IGame } from "../../Types";

export const sortByPlaytimeDesc = (games: IGame[]): IGame[] => {
    return games.sort((a: IGame, b: IGame) => b.playtime_forever - a.playtime_forever)
}