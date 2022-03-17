import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Logger from "../util/Logger";
import { Collections } from "../types/Database";

export const collections: Collections = {};

export async function connectToDatabase() {
    Logger.info("Connecting to database...");

    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        process.env.DB_CONN_STRING ?? "mongodb://127.0.0.1:27017",
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const configsCollection: mongoDB.Collection = db.collection(
        process.env.CONFIG_COLLECTION_NAME ?? "config",
    );

    collections.configs = configsCollection;

    Logger.info("Successfully connected to database!");
}
