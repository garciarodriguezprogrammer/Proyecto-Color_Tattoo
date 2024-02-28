import {Request, Response} from "express";
import { User } from "../models/user";
import { AppDataSource } from "../database/data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "123456789";
//Clase que se encarga de la autenticacion de los artistas
export class ArtistAuthController{     
    //Funcion  para  registrar  artistas
    async artistRegister(req: Request, res: Response): Promise <void|Response<any>> {   

        const {userName, email, password} = req.body;
        const rol = "artist";
        
        try {

            const userExists = await AppDataSource.getRepository(User).findOneBy({email});
            if (userExists){
                return res
                .status(400)
                .json({message: "This user already exists"})
            }
            //Esto es para encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10); 
            //Crear usuario con la contraseña ya encriptada
            const newUser = AppDataSource.getRepository(User).create({
                userName: userName, 
                email: email,
                password: hashedPassword,
                rol: rol                
            });

            //Guardar  el  nuevo artista
            const saveUser = await AppDataSource.getRepository(User).save(newUser);
            if (!saveUser){
                return res.status(500).json({
                    message: "Error saving user"
                })
            }
            const {password: _,...userWithoutPass} = saveUser;
            return res.json(userWithoutPass);
        }
        catch (error) {
             //Instanciamos la clase error
            if (error instanceof Error){
                return res 
                .status(500)
                .json({
                    message: "Not registered user", 
                    error: error.message
                });
            } else {
                return res 
                .status(500)
                .json({
                    message: "unknow_error", 
                    error: "unknow_error"
                });
            }  
        }
    }
    //Metodo  para  loguear  un artista
    async artistLogin(req: Request, res: Response): Promise <Response>{
        try {
            const {email, password} = req.body;
            const user = await AppDataSource.getRepository(User).findOne({
                where: {email: email}
            });

            console.log('Desde auth-controller: '+user);
            if (!user){
                return res.status(401).json({
                    message: "This user doesn't exist"
                });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Your email or password is wrong"
                });
            
            }

            const token = jwt.sign({id: user.id, rol: user.rol}, secretKey, {
                expiresIn: "1h"
            });

            return res.json({message: "Succesfully login", token: token});
        }

        catch(error) {
            return res.status(500).json({
                message: "Error login", error
            })
        }
    }
}