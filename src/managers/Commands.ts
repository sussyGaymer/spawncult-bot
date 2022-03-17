import { Command } from "../types/Commands";
import * as fs from "fs";
import { Client, Message } from "discord.js";
import Config from "../models/config";
import { collections } from "../services/database.service";
import Logger from "../util/Logger";

export default class CommandsManager {
    client!: Client;

    commands: Command[] = [];
    prefix = "_";

    hasInit = false;

    private listener(message: Message) {
        const conditions = [
            !message.guild,
            message.author.bot,
            !message.content.startsWith(this.prefix),
        ];
        if (conditions.filter(Boolean).length !== 0) return;

        const args = message.content.split(" ");
        const cmd = args.shift()?.slice(this.prefix.length);

        const command = this.commands.find((x) => x.name === cmd);
        if (!command) return;

        if (
            command.restrictedTo &&
            !command.restrictedTo.includes(message.author.id)
        )
            return;

        command.listener(this.client, message, args, this);
    }

    async init(client: Client) {
        if (this.hasInit) throw new Error("CommandsManager has already init!");

        Logger.info("Initializing the commands manager.");

        this.hasInit = true;
        this.client = client;

        const isEnvDevelopment = process.env.NODE_ENV === "development";
        const commandFiles = fs
            //please somene get rid of the ugly ternary expression
            .readdirSync(`${isEnvDevelopment ? "build/" : ""}commands`)
            .filter((x) => x.endsWith(".js"));

        const commands: Command[] = [];

        commandFiles.forEach((fileName) => {
            commands.push(
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require(`../commands/${fileName}`).default,
            );
        });

        const requiredFields = ["name", "listener"];

        this.commands = commands.filter((cmd) =>
            Object.keys(cmd).some((key) => !requiredFields.includes(key)),
        );

        const prefix = (await collections.configs?.findOne({
            name: "prefix",
        })) as Config | undefined;

        if (prefix) this.prefix = prefix.value;

        client.on("messageCreate", this.listener.bind(this));

        Logger.info(
            "Successfully initialized the commands manager with prefix '" +
                this.prefix +
                "'. Loaded commands: " +
                this.commands.map((x) => x.name).join(", "),
        );
    }
}
