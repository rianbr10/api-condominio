import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import {router} from "./routes";
import {CustomError} from "./utils/errors";
import {addLogRotate, logger} from "./utils/logger";

export class App {
    public server: express.Application;

    constructor() {
        addLogRotate('./src/workspace/')
        this.server = express();
        this.middleware();
        this.router();
        this.errorMiddleware();
    }

    private middleware() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({extended: true}));
        this.server.use(helmet());
    }

    private router() {
        this.server.use('/api/v1', router);
    }

    private errorMiddleware() {
        this.server.use(
            (
                error: Error,
                request: Request,
                response: Response,
                next: NextFunction
            ) => {
                if (error instanceof CustomError) {
                    logger.error(`Error: ${error.message} - Status: ${error.statusCode}`);
                    return response.status(error.statusCode).json({
                        status: error.statusCode,
                        message: error.message,
                    });
                }
                logger.error(`Error: ${error.message} - Status: ${500}`);
                return response.status(500).json({
                    status: "error",
                    message: error.message,
                });
            }
        );
    }
}
