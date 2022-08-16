import { Command } from "../types/Commands";

const PlayCommand: Command = {
    name: "stop",
    listener: (client, message, args, _, musicManager) => {
        if (!message.member?.voice.channelId)
            return message.reply("Join a voice channel that I can access.");

        musicManager.stop(message);
    },
};

export default PlayCommand;
