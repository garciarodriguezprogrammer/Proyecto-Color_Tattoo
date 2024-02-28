import { User } from "../../models/user";
import { AppDataSource } from "../data-source";

const userData = [
    { userName: "user1", email: "user1@example.com", password: "password1", rol: "admin" },
    { userName: "user2", email: "user2@example.com", password: "password2", rol: "user" },    
];

AppDataSource.initialize()
    .then(async () => {
        const userRepository = AppDataSource.getRepository(User);
        const users = userRepository.create(userData); 
        await userRepository.save(users); 
        console.log("Seeders de usuarios ejecutados");
    })
    .catch(error => console.log('Error ejecutando seeders'+error));
