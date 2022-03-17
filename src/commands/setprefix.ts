import offlineConfig from "../offlineConfig";
import { collections } from "../services/database.service";
import { Command } from "../types/Commands";
import Logger from "../util/Logger";

const SetPrefixCommand: Command = {
    name: "setprefix",
    restrictedTo: [offlineConfig.devId],
    args: {
        name: "prefix",
        optional: false,
    },
    listener: function (client, message, args, manager) {
        if (!args || !args[0])
            return message.reply("Please provide a new prefix.");

        const newPrefix = args[0];

        collections.configs
            ?.replaceOne(
                { name: "prefix" },
                { name: "prefix", value: newPrefix },
            )
            .then(() => {
                manager.prefix = newPrefix;
                message.reply(
                    "✅ Successfully updated prefix to '" + newPrefix + "'",
                );
            })
            .catch((err) => {
                message.reply("❌ An error occured when updating the prefix.");
                Logger.error("Error occured when changing prefix: " + err.name);
            });
    },
};

export default SetPrefixCommand;
