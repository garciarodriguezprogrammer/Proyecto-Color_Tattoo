"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controller/UsersController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
const ArtistAuthController_1 = require("../controller/ArtistAuthController");
const router = express_1.default.Router();
const usersController = new UsersController_1.UsersController();
const artistAuthController = new ArtistAuthController_1.ArtistAuthController();
router.get("/getArtists", authMiddleware_1.default, adminMiddleware_1.default, usersController.getArtists);
router.post("/artistRegister", artistAuthController.artistRegister);
router.post("/artistLogin", artistAuthController.artistLogin);
exports.default = router;
