import {Router} from "express";
import CreatedController from "./Controllers/CreateController";

const routesLotes: Router = Router();

routesLotes.post("/", new CreatedController().handle)
// routesLotes.get("/", new GetAllController().handle)
//
// routesLotes.get("/:id_banner", new GetByIdController().handle)
// routesLotes.put("/:id_banner", new UpdatedController().handle)
// routesLotes.delete("/:id_banner", new DeletedGrupoUsuarioController().handle)

export {
    routesLotes
};