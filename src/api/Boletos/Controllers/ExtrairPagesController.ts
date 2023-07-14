import {Request, Response} from "express";
import ExtrairPagesService from "../Services/ExtrairPagesService";

export default class ImportarController {
    public service: ExtrairPagesService;
    
    constructor() {
        this.service = new ExtrairPagesService();
        this.handle = this.handle.bind(this);
    }
    
    async handle(request: Request, response: Response) {
        const result = await this.service.execute(request.file as Express.Multer.File);
        return response.status(201).json(result);

    }
}
