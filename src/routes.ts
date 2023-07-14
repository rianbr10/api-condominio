import { Router } from "express";
import {routesLotes} from './api/Lotes/lotes.routes'
import {routesBoletos} from './api/Boletos/boletos.routes'

const router: Router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Seja bem vindo a API Modelo do Augusto!",
    });
})

router.use("/lotes", routesLotes)
router.use("/boletos", routesBoletos)

export { router };
