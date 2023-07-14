import {Request, Response} from "express";
import GetAllService from "../Services/GetAllService";

export default class GetAllController {
    public service: GetAllService;
    
    constructor() {
        this.service = new GetAllService();
        this.handle = this.handle.bind(this);
    }
    
    async handle(request: Request, response: Response) {
        const result = await this.service.execute(request.query);
        return response.status(201).json(result);

    }
}
