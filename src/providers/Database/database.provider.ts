import mongoose from "mongoose";
import { log } from "utils";
import { config } from "node-config-ts"

class Database {

    private static _instance: Database;
    private _Uri: string = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbUri}`;

    constructor() 
    {

    }

    public static getInstance(): Database 
    {
        if ( !this._instance ) {
            this._instance = new Database();
        }

        return this._instance;
    } 

    public initialize(): void 
    {
        mongoose.connect(this.getUri(), {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connection
            serverSelectionTimeoutMS: 5000, //Kepp trying to send operation for 5 seconds
            socketTimeoutMS: 45000, // Close socker after 45 seconds of inactivity
        })
        .then(() => {
            log.info("Database Connected")
        })
        .catch((error) => {
            log.error(`Database Error ${error}`)
        })
    }


    public getUri(): string 
    {
        return this._Uri;
    }

    public setUri(Uri: string): void
    {
        this._Uri = Uri;
    }
}

export default Database