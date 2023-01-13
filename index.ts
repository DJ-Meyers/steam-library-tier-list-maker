import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import axios from "axios";
import { DefaultAzureCredential } from "@azure/identity";
import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";

const credential = new DefaultAzureCredential();

const vaultName = "steam-tier-list-maker-kv"
const url = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(url, credential);



dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {

});

const getSteamApiKey = async (): Promise<string> => {
    const res: KeyVaultSecret = await client.getSecret("STEAM-API-KEY");
    return res.value || "";
}

app.get('/api/gamesList/:steamId', async (req: Request, res: Response) => {
    const steamId = req.params.steamId;
    const STEAM_API_KEY = await getSteamApiKey();
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&format=json&steamid=${steamId}&include_appinfo=true`;
    const resp = await axios.get(url);
    res.send(resp.data);
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
