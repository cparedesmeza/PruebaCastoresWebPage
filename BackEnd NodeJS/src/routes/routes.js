import { Router } from "express";
import {getUser, Login, newUser, newRegister, getRegister, deleteRegister, newHistory, getHistory, getUserByMail, sendMail} from "../controllers/controllers.js";

const router = Router();
router.post("/login", Login);
router.post('/newUser', newUser);
router.get('/getUser/:id',getUser);
router.get('/getUserByMail/:correo',getUserByMail)

/* Rutas para videos */
router.post('/newRegister',newRegister);
router.post('/getRegister', getRegister);
router.delete('/deleteRegister/:id', deleteRegister);

/* Rutas para historial */
router.post('/newHistory',newHistory);
router.get('/getHistory',getHistory);

/* Ruta para Mail */
router.post('/sendMail', sendMail);

export default router;