import express from "express";
import { UsersController } from "../controller/UsersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";
const router = express.Router();
const usersController = new UsersController();

// router.use(verifyKey);
//Listar usuarios 
router.get("/getUsers", verifyKey, isAdmin,usersController.getAll); //YA
//Obtener perfil de usuarios por id
router.get("/userId/:id", verifyKey, isAdmin,usersController.getById); //YA
//Modificar el perfil del usuario
router.patch("/modifyProfile/:id", verifyKey, usersController.modifyProfile); //YA

export default router;