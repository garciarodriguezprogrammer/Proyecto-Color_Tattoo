"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const router = express_1.default.Router();
const authController = new AuthController_1.AuthController();
//Registrar usuarios
router.post("/register", authController.register); //YA
//Loguear usuarios
router.post("/login", authController.loginUser); //YA
exports.default = router;
