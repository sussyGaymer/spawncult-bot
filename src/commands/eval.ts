import offlineConfig from "../offlineConfig";
import { Command } from "../types/Commands";

const EvalCommand: Command = {
    name: "eval",
    restrictedTo: [offlineConfig.devId],
    args: {
        name: "code",
        optional: false,
        end: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listener: (client, message, args, commandsManager, musicManager) => {
        if (!args || !args[0])
            return message.reply("Please provide some code to evaluate.");

        const code = args.join(" ");

        try {
            const output = eval(
                code
                    .replace(/^```(js|javascript|)\n/g, "")
                    .replace(/\n```/g, ""),
            )
                .toString()
                .replace(
                    client.token,
                    "########################.######.###########################",
                );
            message.reply({
                embeds: [
                    {
                        title: "Success ✅",
                        description: `**Result:**\n\`\`\`js\n${output}\n\`\`\`\n**Input:**\n\`\`\`js\n${code
                            .replace(/```(js|javascript)\n/g, "")
                            .replace(/(\n|)```(\n|)/gm, "")}\n\`\`\``,
                        color: "GREEN",
                    },
                ],
            });
        } catch (err: any) {
            message.reply({
                embeds: [
                    {
                        title: "Error: " + err.message,
                        description: err.stack,
                        color: "RED",
                    },
                ],
            });
        }
    },
};

export default EvalCommand;
