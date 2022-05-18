import express, { Application } from "express";
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
    private express: Application = express();

    constructor() 
    {   
        this.initializeMiddleware();
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

    public initializeConnection(): void 
    {
        this.express.listen(this.port, this.host, () => {
            log.info(`App running on porst ${this.port}`)
        });
    }
}

export default App;