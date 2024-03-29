"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controller/UsersController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
const router = express_1.default.Router();
const usersController = new UsersController_1.UsersController();
// router.use(verifyKey);
//Listar usuarios 
router.get("/getUsers", authMiddleware_1.default, adminMiddleware_1.default, usersController.getAll);
//Obtener perfil de usuarios por id
router.get("/userId/:id", authMiddleware_1.default, usersController.getById);
//Modificar el perfil del usuario
router.patch("/modifyProfile/:id", authMiddleware_1.default, usersController.modifyProfile);
//Obtener artistas por su ID
router.get("/getArtistById/:id", authMiddleware_1.default, usersController.getArtistsById);
//Eliminar artistas por su ID
router.get("/deleteUserById/:id", authMiddleware_1.default, usersController.deleteUserById);
exports.default = router;
