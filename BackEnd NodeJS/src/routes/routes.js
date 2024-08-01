import { Router } from "express";
import {getUser, Login, newUser, newRegister} from "../controllers/controllers.js";

const router = Router();
router.post("/login", Login);
router.post('/newUser', newUser);
router.get('/getUser/:id',getUser);

/* Rutas para videos */
router.post('/newRegister',newRegister);

export default router;