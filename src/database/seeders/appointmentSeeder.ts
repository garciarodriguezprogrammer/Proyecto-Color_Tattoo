import { Appointment } from "../../models/appointment";
import { User } from "../../models/user";
import { AppDataSource } from "../data-source"; 

AppDataSource.initialize()
    .then(async () => {
        const userRepository = AppDataSource.getRepository(User);
        const appointmentRepository = AppDataSource.getRepository(Appointment);

        const client = await userRepository.findOneBy({ id: 1 }); 
        const artist = await userRepository.findOneBy({ id: 2 }); 

        if (client && artist) {
            const newAppointment = new Appointment();
            newAppointment.idClient = client;
            newAppointment.idArtist = artist;
            newAppointment.appointmentDate = new Date(2024, 3, 14, 15, 30); 
            newAppointment.descriptionTattoo = "Ejemplo de descripción de tatuaje";

            await appointmentRepository.save(newAppointment);
            console.log("Seeder de citas ejecutado.");
        } else {
            console.log("No se encontraron los usuarios necesarios para crear citas.");
        }
    })
    .catch(error => console.log("Error al ejecutar el seeder de citas:", error));
