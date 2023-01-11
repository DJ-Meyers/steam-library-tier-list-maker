export interface IGame {
    name: string,
    img_icon_url: string,
    playtime_forever: number,
    appid: number,
}

export interface ITierlistRow {
    tierName: string;
    games: IGame[];
    color: string;
    hoverColor: string;
}