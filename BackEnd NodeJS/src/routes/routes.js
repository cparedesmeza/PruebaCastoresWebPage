import { Router } from "express";
import {getUser, Login, newUser, newRegister, getRegister, deleteRegister, newHistory, getHistory} from "../controllers/controllers.js";

const router = Router();
router.post("/login", Login);
router.post('/newUser', newUser);
router.get('/getUser/:id',getUser);

/* Rutas para videos */
router.post('/newRegister',newRegister);
router.post('/getRegister', getRegister);
router.delete('/deleteRegister/:id', deleteRegister);

/* Rutas para historial */
router.post('/newHistory',newHistory);
router.get('/getHistory',getHistory);

export default router;