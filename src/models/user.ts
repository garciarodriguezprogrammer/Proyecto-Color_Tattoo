import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ length: 100 })
    userName: string; 

    @Column({ length: 100 })
    email: string;

    @Column({ length: 100 })
    password: string; 

    @Column({ length: 50 })
    rol: string; 

    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date; 

    @OneToMany(() => Appointment, appointment => appointment.idClient)
    clientAppointments: Appointment[];

    @OneToMany(() => Appointment, appointment => appointment.idArtist)
    artistAppointments: Appointment[];

}
