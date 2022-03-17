import { Client, Message } from "discord.js";
import CommandManager from "../managers/Commands";

export interface Argument {
    optional: boolean;
    name: string;
    //whether it's the last arg (captures everything after the last recognised arg)
    end?: boolean;
}

export type Command = {
    name: string;
    args: Argument | Argument[];
    restrictedTo?: string[];
    listener: (
        client: Client,
        message: Message,
        args: string[],
        manager: CommandManager,
    ) => void;
};
