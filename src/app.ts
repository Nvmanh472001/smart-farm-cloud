import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { config } from "node-config-ts";
import { log } from "utils";


class App {
    private static _instance: App;
    private port: number = config.port;
    private host: string = config.host;
    private db_endpoint: string = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbUri}`;
    private express: Application = express();

    constructor() 
    {   
        this.initializeMiddleware();
        this.initalizeDatabase();
    }

    public static getInstance(): App 
    {
        if ( !this._instance ) {
            this._instance = new App();
        }

        return this._instance;
    }

    private initializeMiddleware(): void 
    {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    public initalizeDatabase(): void
    {
        mongoose.connect(this.db_endpoint, {
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

    public initializeConnection(): void 
    {
        this.express.listen(this.port, this.host, () => {
            log.info(`App running on porst ${this.port}`)
        });
    }
}

export default App;