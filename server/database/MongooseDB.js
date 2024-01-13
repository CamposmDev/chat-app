
import mongoose from "mongoose";
import { MongooseUserDBM } from "./managers/index.js"

class MongooseDB {
    constructor() {
        this._users = new MongooseUserDBM();
    }

    async connect(uri, options) {
        await mongoose.connect(uri, options).then(() => {
            console.info("connected to mongodb server")
        }).catch(err => {
            console.error(err.message);
        })
    }

    async close() {
        await mongoose.connection.close();
    }

    get users() { return this._users }
}

export {
    MongooseDB
}