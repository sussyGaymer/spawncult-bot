import { Command } from "../types/Commands";

const NowPlayingCommand: Command = {
    name: "nowplaying",
    listener: (client, message, _, __, musicManager) => {
        musicManager.nowPlaying(message);
    },
};

export default NowPlayingCommand;
