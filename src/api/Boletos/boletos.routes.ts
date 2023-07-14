import {Router} from "express";
import multer from "multer";
import CreatedController from "./Controllers/CreateController";
import GetAllController from "./Controllers/GetAllController";
import ImportarController from "./Controllers/ImportarController";
import ExtrairPagesController from "./Controllers/ExtrairPagesController";
const maxSize = 50 * 1024 * 1024; // 50 MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: maxSize,
    },
});
const routesBoletos: Router = Router();

routesBoletos.post("/", new CreatedController().handle)
routesBoletos.get("/", new GetAllController().handle)
routesBoletos.post("/import-csv", upload.single('boletos'), new ImportarController().handle)
routesBoletos.post("/extract-pages", upload.single('pdf'), new ExtrairPagesController().handle)
//
// routesBoletos.get("/:id_banner", new GetByIdController().handle)
// routesBoletos.put("/:id_banner", new UpdatedController().handle)
// routesBoletos.delete("/:id_banner", new DeletedGrupoUsuarioController().handle)

export {
    routesBoletos
};