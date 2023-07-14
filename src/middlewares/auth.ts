import {Request, Response} from "express";

export class Auth {
    async handle(request: Request, response: Response) {
        console.log("Auth middleware");
        console.log(request.headers.authorization);

    }
}
