# SpawnCult Bot
#### A bot for the SpawnCult Discord server

<br>

### Requirements for building/running:
- [NodeJS & NPM](https://nodejs.org)
- [PNPM](https://pnpm.io)

<br>

## Building
Once you ensured you have node and pnpm installed, open the terminal at the root of the project and run `pnpm i`.

This will install all of the required packages for the bot.

(You also may need typescript, so install it using `pnpm i -g typescript`)

When all of the packages are installed, run `npm run build` or `yarn build` if you're using yarn.


The compiled JS files will be inside the `build` directory.

## Deploying
To deploy the bot to production, you need to first [build](#building) the bot.

Then copy the JS files (and package.json and pnpm-lock.yaml) to your server and install all of the NPM packages.

You will also need a [MongoDB](https://www.mongodb.com/try/download/community) server, that being Atlas or your own selfhosted database (choose "MongoDB Community Server" when downloading).

Create a .env file at the root of the project with such contents: 
```
BOT_TOKEN=the bot token here

DB_CONN_STRING=your mongodb connection string (mongodb://127.0.0.1:27017)
DB_NAME=spawncult-bot
CONFIG_COLLECTION_NAME=config
```
Once your project is built and the database is set up, cross your fingers and run `node index.js`.

<br>

If you get any errors dont you dare complain to me.


## Development
You'll need a text editor (an IDE is not required, but recommended, I personally recommend VScode).

Install all NPM packages and run `npm run build-watch` (or `yarn build-watch`), keep in mind you need to install tsc beforehand.

The bot will be recompiled everytime you save a file now.

To run it, open a terminal **at the root of the project** and execute `node build/index.js --dev`. The `--dev` part is very important!
