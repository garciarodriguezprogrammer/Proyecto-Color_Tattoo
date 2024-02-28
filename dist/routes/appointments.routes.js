"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppointmentsController_1 = require("../controller/AppointmentsController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
const router = express_1.default.Router();
const appointmentsController = new AppointmentsController_1.AppointmentsController();
//Crear una cita
router.post("/createAppointment", authMiddleware_1.default, appointmentsController.createAppointment); //YA
//Listar citas
router.get("/getAppointments", adminMiddleware_1.default, authMiddleware_1.default, appointmentsController.getAppointments); //YA
//Recuperar citas por su ID 
router.get("/getAppointmentById/:id", authMiddleware_1.default, appointmentsController.getAppointmentById); //YA
//Modificar cita por ID
router.patch("/modifyAppointment/:id", authMiddleware_1.default, appointmentsController.modifyAppointment); //YA
//Eliminar cita por ID
router.delete("/deleteAppointment/:id", authMiddleware_1.default, appointmentsController.deleteAppointment); //YA
//Recuperar citas de cliente por el id del cliente
router.get("/getAppointmentByClient/:id", authMiddleware_1.default, appointmentsController.getAppointmentByClient); //YA
//Recuperar citas de artista por el id del artista
router.get("/getAppointmentByArtist/:id", authMiddleware_1.default, appointmentsController.getAppointmentByArtist); //YA
exports.default = router;
