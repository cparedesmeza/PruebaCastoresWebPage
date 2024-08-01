import { Router } from "express";
import {getUser, Login, newUser, newRegister, getRegister, deleteRegister} from "../controllers/controllers.js";

const router = Router();
router.post("/login", Login);
router.post('/newUser', newUser);
router.get('/getUser/:id',getUser);

/* Rutas para videos */
router.post('/newRegister',newRegister);
router.get('/getRegister', getRegister);
router.delete('/deleteRegister/:id', deleteRegister);

export default router;