import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    // Esto le dice a TypeORM que el nombre de la columna de la clave foránea es "idClient"
    @JoinColumn({ name: "idClient" }) 
    idClient: User;

    @ManyToOne(() => User, { nullable: false })
    // Esto le dice a TypeORM que el nombre de la columna de la clave foránea es "idArtist"
    @JoinColumn({ name: "idArtist" }) 
    idArtist: User;

    @Column("timestamp", { nullable: false })
    appointmentDate: Date;

    @Column("text", { nullable: false })
    descriptionTattoo: string;
}
