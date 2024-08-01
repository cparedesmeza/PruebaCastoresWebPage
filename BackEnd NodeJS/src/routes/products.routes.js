import { Router } from "express";
import {Login, newUser} from "../controllers/products.controllers.js";

const router = Router();
router.post("/login", Login);
router.post('/newUser', newUser);


export default router;