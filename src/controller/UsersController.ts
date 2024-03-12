import { AppDataSource } from "../database/data-source";
import {Response, Request} from "express";
import {User} from "../models/user";

export class UsersController{
   async getAll(req: Request, res: Response){
    const users = await AppDataSource.getRepository(User).find();
    return res.json(users);
   }
   //Recuperar un usuario por ID
   async getById(req: Request, res: Response){
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
         return res.status(400).json({
            message: "Invalid ID"
         });
      }

      const user = await AppDataSource.getRepository(User).findOne({
         where:{id}  
      });

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      return res.json(user);
   }
      //Recuperar artistas
   async getArtists(req: Request, res: Response){
      const rol = "Artist";
      const artists = await AppDataSource.getRepository(User).find({
         where: {rol: rol}
      });

      if (artists) {
         return res.json(artists);
      }
      else {
         return res.json({message:"error recovering artists"})
      }
   }
      //Recuperar artistas by ID
   async getArtistsById(req: Request, res: Response){
      const artistId = parseInt(req.params.id)
      const rol = "Artist";
      console.log("el id del artista es" + artistId)
      const artist = await AppDataSource.getRepository(User).find({
         where: {rol: rol, id: artistId}
      });

      if (artist) {
         return res.json(artist);
      }
      else {
         return res.json({message:"error recovering artist by id"})
      }
   }

   async modifyProfile(req: Request, res: Response){
      const id = parseInt(req.params.id);
      const profileData = req.body;

      try {
         const profile = await AppDataSource.getRepository(User).findOneBy({id: id});
         if (!profile) {
            return res.status(404).json({
               message: "User not found"
            });
         }
         AppDataSource.getRepository(User).merge(profile, profileData);
         const updatedUser = await AppDataSource.getRepository(User).save(profile);
         return res.json(updatedUser);
      } catch (error) {
         return res.status(500).json({
            message: "Error updating profile"
         });
      }
      
   }

}


