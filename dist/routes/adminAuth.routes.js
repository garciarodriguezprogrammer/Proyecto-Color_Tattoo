"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminAuthController_1 = require("../controller/AdminAuthController");
const router = express_1.default.Router();
const authController = new AdminAuthController_1.AdminAuthController();
//Registrar administrador
router.post("/adminRegister", authController.adminRegister);
//Loguear administrador
router.post("/adminLogin", authController.adminLogin);
exports.default = router;
