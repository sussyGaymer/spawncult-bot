import { Command } from "../types/Commands";

const PlayCommand: Command = {
    name: "play",
    args: {
        name: "song",
        optional: false,
        end: true,
    },
    listener: (client, message, args, _, musicManager) => {
        if (!args || !args[0])
            return message.reply("Please provide a song to play.");

        if (!message.member?.voice.channelId)
            return message.reply("Join a voice channel that I can access.");

        const song = args.join(" ");

        musicManager.play(song, message);
    },
};

export default PlayCommand;
