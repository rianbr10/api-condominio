import {Request, Response} from "express";
import ImportarService from "../Services/ImportarService";

export default class ImportarController {
    public service: ImportarService;
    
    constructor() {
        this.service = new ImportarService();
        this.handle = this.handle.bind(this);
    }
    
    async handle(request: Request, response: Response) {
        const result = await this.service.execute(request.file as Express.Multer.File);
        return response.status(201).json(result);

    }
}
