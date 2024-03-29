import express from "express";
import { AuthController } from "../controller/AuthController";

const router = express.Router();
const authController = new AuthController();
//Registrar usuarios
router.post("/register", authController.register); 
//Loguear usuarios
router.post("/login", authController.loginUser);

export default router;