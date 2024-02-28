import express from "express";
import { UsersController } from "../controller/UsersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";
import { ArtistAuthController } from "../controller/ArtistAuthController";

const router = express.Router();
const usersController = new UsersController();
const artistAuthController = new ArtistAuthController();

router.get("/artists", verifyKey, isAdmin, usersController.getArtists); 
router.post("/artistRegister", artistAuthController.artistRegister);
router.post("/artistLogin", artistAuthController.artistLogin);

export default router;