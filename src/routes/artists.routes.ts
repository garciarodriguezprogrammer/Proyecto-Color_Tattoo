import express from "express";
import { UsersController } from "../controller/UsersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const router = express.Router();
const usersController = new UsersController();

router.get("/artists", verifyKey, isAdmin, usersController.getArtists); //YA

export default router;