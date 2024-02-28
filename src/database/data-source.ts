import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Appointment } from "../models/appointment";
export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "Color_Tattoo",
    entities: [
        User, Appointment
    ],
    migrations: [
        `${__dirname}/migrations/**/*{.js,.ts}`
    ],
    synchronize: false,
    logging: false, 
});

AppDataSource.initialize ()
    .then(()=>{
        console.log ("Se ha conetado la base de datos ...🚀")
    })
    .catch((error)=>{
        console.log ("Ha habido un error: "+ error)
    })
