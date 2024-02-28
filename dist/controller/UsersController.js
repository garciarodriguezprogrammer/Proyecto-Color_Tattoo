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
exports.UsersController = void 0;
const data_source_1 = require("../database/data-source");
const user_1 = require("../models/user");
class UsersController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield data_source_1.AppDataSource.getRepository(user_1.User).find();
            return res.json(users);
        });
    }
    //Recuperar un usuario por ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID"
                });
            }
            const user = yield data_source_1.AppDataSource.getRepository(user_1.User).findOne({
                where: { id }
            });
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            return res.json(user);
        });
    }
    //Recuperar artistas
    getArtists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rol = "Artist";
            const artists = yield data_source_1.AppDataSource.getRepository(user_1.User).find({
                where: { rol: rol }
            });
            if (artists) {
                return res.json(artists);
            }
            else {
                return res.json({ message: "error recovering artists" });
            }
        });
    }
    modifyProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const profileData = req.body;
            try {
                const profile = yield data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({ id: id });
                if (!profile) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                data_source_1.AppDataSource.getRepository(user_1.User).merge(profile, profileData);
                const updatedUser = yield data_source_1.AppDataSource.getRepository(user_1.User).save(profile);
                return res.json(updatedUser);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error updating profile"
                });
            }
        });
    }
}
exports.UsersController = UsersController;
