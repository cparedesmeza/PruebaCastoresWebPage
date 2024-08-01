import { Router } from "express";
import {getUser, Login, newUser} from "../controllers/products.controllers.js";

const router = Router();
router.post("/login", Login);
router.post('/newUser', newUser);
router.get('/getUser/:id',getUser);


export default router;