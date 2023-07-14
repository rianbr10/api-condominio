import {Request, Response} from "express";
import CreateService from "../Services/CreateService";

export default class CreateController {
    public service: CreateService;
    
    constructor() {
        this.service = new CreateService();
        this.handle = this.handle.bind(this);
    }
    
    async handle(request: Request, response: Response) {
        const result = await this.service.execute(request.body);
        return response.status(201).json(result);

    }
}
