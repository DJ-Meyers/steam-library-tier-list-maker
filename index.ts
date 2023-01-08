import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import axios from "axios";

dotenv.config();
const STEAM_API_KEY = process.env.STEAM_API_KEY;

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {

});

app.get('/api/gamesList/:steamId', async (req: Request, res: Response) => {
    const steamId = req.params.steamId;
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&format=json&steamid=${steamId}&include_appinfo=true`;
    const resp = await axios.get(url);
    res.send(resp.data);
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
