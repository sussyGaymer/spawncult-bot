import { ObjectId } from "mongodb";

export default class Config {
    constructor(
        public key: string,
        public value: string,
        public id?: ObjectId,
    ) {}
}
