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
const appointment_1 = require("../../models/appointment");
const user_1 = require("../../models/user");
const data_source_1 = require("../data-source"); // Ajusta la ruta según sea necesario.
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    const appointmentRepository = data_source_1.AppDataSource.getRepository(appointment_1.Appointment);
    // Asumiendo que ya tienes usuarios en tu base de datos.
    const client = yield userRepository.findOneBy({ id: 1 }); // Asegúrate de que este ID exista.
    const artist = yield userRepository.findOneBy({ id: 2 }); // Asegúrate de que este ID exista.
    if (client && artist) {
        const newAppointment = new appointment_1.Appointment();
        newAppointment.idClient = client;
        newAppointment.idArtist = artist;
        newAppointment.appointmentDate = new Date(2024, 3, 14, 15, 30); // Ajusta la fecha según sea necesario.
        newAppointment.descriptionTattoo = "Ejemplo de descripción de tatuaje";
        yield appointmentRepository.save(newAppointment);
        console.log("Seeder de citas ejecutado.");
    }
    else {
        console.log("No se encontraron los usuarios necesarios para crear citas.");
    }
}))
    .catch(error => console.log("Error al ejecutar el seeder de citas:", error));
