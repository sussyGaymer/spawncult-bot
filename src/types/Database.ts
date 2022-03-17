import * as mongoDB from "mongodb";

export interface Collections {
    configs?: mongoDB.Collection;
}
