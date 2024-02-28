import express from "express";
import { AdminAuthController } from "../controller/AdminAuthController";

const router = express.Router();
const authController = new AdminAuthController();
//Registrar  administrador
router.post("/adminRegister", authController.adminRegister);  
//Loguear administrador
router.post("/adminLogin", authController.adminLogin);

export default router;