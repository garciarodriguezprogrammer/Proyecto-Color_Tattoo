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
const user_1 = require("../../models/user");
const data_source_1 = require("../data-source");
const userData = [
    { userName: "user1", email: "user1@example.com", password: "password1", rol: "admin" },
    { userName: "user2", email: "user2@example.com", password: "password2", rol: "user" },
    // Agrega más usuarios según sea necesario
];
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    const users = userRepository.create(userData); // Crea instancias de usuario
    yield userRepository.save(users); // Guarda los usuarios en la base de datos
    console.log("Seeders de usuarios ejecutados");
}))
    .catch(error => console.log('Error ejecutando seeders' + error));
