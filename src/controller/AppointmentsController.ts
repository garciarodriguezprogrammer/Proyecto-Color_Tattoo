import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/appointment";
import { User } from "../models/user";
import { Request, Response } from "express";

export class AppointmentsController {
    async createAppointment(req: Request, res: Response): Promise<Response> {
        const { idClient, idArtist, appointmentDate, descriptionTattoo } = req.body;
        console.log(req.body)
        try {
            //Comprobacion de que exista el cliente
            const client = await AppDataSource.getRepository(User).findOneBy({
                id: idClient
            });

            if (!client) {
                return res.status(404).json({ message: "Client not found" })
            }

            //Comprobacion de que exista el artista
            const artist = await AppDataSource.getRepository(User).findOneBy({
                id: idArtist
            });

            if (!artist) {
                return res.status(404).json({ message: "Artist not found" })
            }
            //Creacion de una cita
            const newAppointment = await AppDataSource.getRepository(Appointment).create({
                appointmentDate,
                descriptionTattoo,
                idClient: client,
                idArtist: artist
            });

            //Guardar la cita en la base de datos
            const saveAppointment = await AppDataSource.getRepository(Appointment).save(
                newAppointment
            );
            //Obtener por consola la cita que hemos guardado
            return res.json(saveAppointment);
        }
        catch (error) {
            return res.status(500).json({ message: "Error creating appointment" });
        }
    }

    //Recuperar las citas
    async getAppointments(req: Request, res: Response) {
        const appointments = await AppDataSource.getRepository(Appointment).find({ relations: ["idClient", "idArtist"]});
        if (!appointments) {
            return res.status(404).json({
                message: "Appointments not found"
            })
        }
        return res.json(appointments.map(appointment => {
            return {
                ...appointment,
                clientName: appointment.idClient.userName,
                artistName: appointment.idArtist.userName
            }
        }));
    }

    //Recuperar cita por id
    async getAppointmentById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!id) {
            return res.status(400).json({
                message: "Id not found"
            })
        }
        const appointment = await AppDataSource.getRepository(Appointment).findOneBy({
            id: id
        });
        if (!appointment) {
            return res.status(400).json({
                message: "Appointment doesn't exist"
            });
        }
        return res.json(appointment);
    }

    //Modificar  una  cita
    async modifyAppointment(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const dates = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Id is not valid"
            });
        }

        try {
            const appointment = await AppDataSource.getRepository(Appointment).findOneBy({ id });
            if (!appointment) {
                return res.status(400).json({
                    message: "Appointment is not found"
                });
            }
            AppDataSource.getRepository(Appointment).merge(appointment, dates);
            const updateAppointment = await AppDataSource.getRepository(Appointment).save(appointment);
            return res.json(updateAppointment);

        } catch (error) {
            return res.status(500).json({
                message: "Error updating appointment", error
            });
        }
    }
    //Eliminar una cita
    async deleteAppointment(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Id is not valid"
            });
        }
        try {
            const result = await AppDataSource.getRepository(Appointment).delete(id);
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
    }

    //Recuperar citas de un cliente
    async getAppointmentByClient(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const appointments = await AppDataSource.getRepository(Appointment).find({
                where: { idClient: { id: parseInt(id) } },
                relations: ["idClient", "idArtist"]
            })
            return res.json(appointments.map(appointment => {
                return {
                    ...appointment,
                    clientName: appointment.idClient.userName,
                    artistName: appointment.idArtist.userName
                }
            }));
        } catch (error) {
            return res.status(500).json({
                message: "Error getting appointments", error
            });
        }
    }
    //Recuperar citas de un artista
    async getAppointmentByArtist(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const appointments = await AppDataSource.getRepository(Appointment).find({
                where: { idArtist: { id: parseInt(id) } },
                relations: ["idClient", "idArtist"]
            })
            return res.json(appointments.map(appointment => {
                return {
                    ...appointment,
                    clientName: appointment.idClient.userName,
                    artistName: appointment.idArtist.userName
                }
            }));
        } catch (error) {
            return res.status(500).json({
                message: "Error getting appointments", error
            });
        }
    }
}