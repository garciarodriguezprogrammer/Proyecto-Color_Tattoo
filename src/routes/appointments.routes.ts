import express from "express";
import { AppointmentsController } from "../controller/AppointmentsController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const router = express.Router();
const appointmentsController = new AppointmentsController();


//Crear una cita
router.post("/createAppointment", verifyKey, appointmentsController.createAppointment); //YA
//Listar citas
router.get("/getAppointments",verifyKey, isAdmin, appointmentsController.getAppointments); //YA
//Recuperar citas por su ID 
router.get("/getAppointmentById/:id", verifyKey, appointmentsController.getAppointmentById); //YA
//Modificar cita por ID
router.patch("/modifyAppointment/:id", verifyKey, appointmentsController.modifyAppointment); //YA
//Eliminar cita por ID
router.delete("/deleteAppointment/:id", verifyKey, appointmentsController.deleteAppointment); //YA
//Recuperar citas de cliente por el id del cliente
router.get("/getAppointmentByClient/:id", verifyKey, appointmentsController.getAppointmentByClient); //YA
//Recuperar citas de artista por el id del artista
router.get("/getAppointmentByArtist/:id", verifyKey, appointmentsController.getAppointmentByArtist); //YA

export default router;