//[timestamp] [level] msg

import chalk from "chalk";
import { format } from "date-fns";

export default class Logger {
    static info(message: string) {
        console.log(
            `[${chalk.green(format(new Date(), "HH:mm:ss"))}] [${chalk.blue(
                "INFO",
            )}] ${message}`,
        );
    }

    static warn(message: string) {
        console.log(
            `[${chalk.green(format(new Date(), "HH:mm:ss"))}] [${chalk.yellow(
                "WARN",
            )}] ${message}`,
        );
    }

    static error(message: string) {
        console.log(
            `[${chalk.green(format(new Date(), "HH:mm:ss"))}] [${chalk.red(
                "ERROR",
            )}] ${message}`,
        );
    }
}
