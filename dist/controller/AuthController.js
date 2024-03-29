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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_1 = require("../models/user");
const data_source_1 = require("../database/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET_KEY || "123456789";
//Clase que se encarga de la autenticacion de los usuarios
class AuthController {
    //Funcion para registrar usuarios
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, email, password } = req.body;
            const rol = "user";
            try {
                const userExists = yield data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({ email });
                if (userExists) {
                    return res
                        .status(400)
                        .json({ message: "This user already exists" });
                }
                //Esto es para encriptar la contraseña
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                //Crear usuario con la contraseña ya encriptada
                const newUser = data_source_1.AppDataSource.getRepository(user_1.User).create({
                    userName: userName,
                    email: email,
                    password: hashedPassword,
                    rol: rol
                });
                //Guardar el nuevo usuario
                const saveUser = yield data_source_1.AppDataSource.getRepository(user_1.User).save(newUser);
                if (!saveUser) {
                    return res.status(500).json({
                        message: "Error saving user"
                    });
                }
                //const {password: _,...userWithoutPass} = saveUser;
                return res.json({ message: "Success" });
            }
            catch (error) {
                //Instanciamos la clase error
                if (error instanceof Error) {
                    return res
                        .status(500)
                        .json({
                        message: "Not registered user",
                        error: error.message
                    });
                }
                else {
                    return res
                        .status(500)
                        .json({
                        message: "unknow_error",
                        error: "unknow_error"
                    });
                }
            }
        });
    }
    //Metodo para loguear un usuario
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield data_source_1.AppDataSource.getRepository(user_1.User).findOne({
                    where: { email: email }
                });
                if (!user) {
                    return res.status(401).json({
                        message: "This user doesn't exist"
                    });
                }
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    return res.json({
                        message: "Your email or password is wrong"
                    });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, rol: user.rol }, secretKey, {
                    expiresIn: "1h"
                });
                return res.json({ message: "Succesfully login", token: token });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error login", error
                });
            }
        });
    }
}
exports.AuthController = AuthController;
