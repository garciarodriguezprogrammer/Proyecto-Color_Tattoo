"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const appointment_1 = require("../models/appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "Color_Tattoo",
    entities: [
        user_1.User, appointment_1.Appointment
    ],
    migrations: [
        `${__dirname}/migrations/**/*{.js,.ts}`
    ],
    synchronize: false,
    logging: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Se ha conetado la base de datos ...🚀");
})
    .catch((error) => {
    console.log("Ha habido un error: " + error);
});
