import { QueueRepeatMode } from "discord-player";
import { Argument, Command } from "../types/Commands";

const LoopCommand: Command = {
    name: "loop",
    args: {
        name: "type",
        options: ["none", "one", "all", "autoplay"],
        optional: true,
    },
    listener: function (client, message, args, _, musicManager) {
        if (!args || !args[0]) args[0] = "one";
        if (!(this.args as Argument)?.options?.includes(args[0]))
            return message.reply("❌ Invalid option: " + args[0]);

        switch (args[0]) {
            case "none":
                musicManager.loop(QueueRepeatMode.OFF, message);
                break;
            case "one":
                musicManager.loop(QueueRepeatMode.TRACK, message);
                break;
            case "all":
                musicManager.loop(QueueRepeatMode.QUEUE, message);
                break;
            case "autoplay":
                musicManager.loop(QueueRepeatMode.AUTOPLAY, message);
                break;
        }
    },
};

export default LoopCommand;
