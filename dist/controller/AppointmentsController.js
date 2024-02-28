"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const data_source_1 = require("../database/data-source");
const appointment_1 = require("../models/appointment");
const user_1 = require("../models/user");
class AppointmentsController {
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idClient, idArtist, appointmentDate, descriptionTattoo } = req.body;
            console.log(req.body);
            try {
                //Comprobacion de que exista el cliente
                const client = yield data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({
                    id: idClient
                });
                if (!client) {
                    return res.status(404).json({ message: "Client not found" });
                }
                //Comprobacion de que exista el artista
                const artist = yield data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({
                    id: idArtist
                });
                if (!artist) {
                    return res.status(404).json({ message: "Artist not found" });
                }
                //Creacion de una cita
                const newAppointment = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).create({
                    appointmentDate,
                    descriptionTattoo,
                    idClient: client,
                    idArtist: artist
                });
                //Guardar la cita en la base de datos
                const saveAppointment = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).save(newAppointment);
                //Obtener por consola la cita que hemos guardado
                return res.json(saveAppointment);
            }
            catch (error) {
                return res.status(500).json({ message: "Error creating appointment" });
            }
        });
    }
    //Recuperar las citas
    getAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).find();
            if (!appointments) {
                return res.status(404).json({
                    message: "Appointments not found"
                });
            }
            return res.json(appointments);
        });
    }
    //Recuperar cita por id
    getAppointmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (!id) {
                return res.status(400).json({
                    message: "Id not found"
                });
            }
            const appointment = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).findOneBy({
                id: id
            });
            if (!appointment) {
                return res.status(400).json({
                    message: "Appointment doesn't exist"
                });
            }
            return res.json(appointment);
        });
    }
    //Modificar  una  cita
    modifyAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const dates = req.body;
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Id is not valid"
                });
            }
            try {
                const appointment = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).findOneBy({ id });
                if (!appointment) {
                    return res.status(400).json({
                        message: "Appointment is not found"
                    });
                }
                data_source_1.AppDataSource.getRepository(appointment_1.Appointment).merge(appointment, dates);
                const updateAppointment = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).save(appointment);
                return res.json(updateAppointment);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error updating appointment", error
                });
            }
        });
    }
    //Eliminar una cita
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID_APPOINTMENT = parseInt(req.params.id);
            if (isNaN(ID_APPOINTMENT)) {
                return res.status(400).json({
                    message: "Id is not valid"
                });
            }
            try {
                const result = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).delete(ID_APPOINTMENT);
                if (result.affected === 0) {
                    return res.status(400).json({
                        message: "Appointment not found"
                    });
                }
                return res.status(200).json({
                    message: "Appointment deleted succesfully"
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error deleting appointment", error
                });
            }
        });
    }
    //Recuperar  citas  de  un  cliente
    getAppointmentByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const appointments = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).find({
                    where: { idClient: { id: parseInt(id) } }
                });
                return res.json(appointments);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error getting appointments", error
                });
            }
        });
    }
    //Recuperar  citas  de  un  artista
    getAppointmentByArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const appointments = yield data_source_1.AppDataSource.getRepository(appointment_1.Appointment).find({
                    where: { idArtist: { id: parseInt(id) } }
                });
                return res.json(appointments);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error getting appointments", error
                });
            }
        });
    }
}
exports.AppointmentsController = AppointmentsController;
