import { Client, Intents } from "discord.js";
import CommandsManager from "./managers/Commands";
import { connectToDatabase } from "./services/database.service";
import Logger from "./util/Logger";

Logger.info("Starting...");

if (process.argv[2] === "--dev") process.env.NODE_ENV = "development";
else process.env.NODE_ENV = "production";

if (process.env.NODE_ENV === "development")
    Logger.info("Starting in development mode.");

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const client = new Client({
    ws: { properties: { $browser: "Discord Android" } },
    intents: Object.values(Intents.FLAGS),
    presence: {
        activities: [
            {
                type: "COMPETING",
                name: "dick size",
            },
        ],
    },
});

client.on("ready", (payload) => {
    Logger.info("Ready! Logged in as " + payload.user.tag + ".");

    connectToDatabase()
        .then(() => {
            new CommandsManager().init(client);
        })
        .catch((err: Error) => {
            Logger.error("Error connecting to the database: " + err.message);
        });
});

/* TODO:
client.on("messageCreate", (message) => {
    if (message.channel.id === "952456787490115584") {
        const channel = message.guild.channels.cache.get(
            message.channel.id,
        ) as GuildChannel;
        const guild = message.guild;

        //delete msg and send in 953668346082107502
    }
});*/

client.login(process.env.BOT_TOKEN);
