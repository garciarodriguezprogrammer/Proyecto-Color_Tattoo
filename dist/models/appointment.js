"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, { nullable: false })
    // Esto le dice a TypeORM que el nombre de la columna de la clave foránea es "idClient"
    ,
    (0, typeorm_1.JoinColumn)({ name: "idClient" }),
    __metadata("design:type", user_1.User)
], Appointment.prototype, "idClient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, { nullable: false })
    // Esto le dice a TypeORM que el nombre de la columna de la clave foránea es "idArtist"
    ,
    (0, typeorm_1.JoinColumn)({ name: "idArtist" }),
    __metadata("design:type", user_1.User)
], Appointment.prototype, "idArtist", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Appointment.prototype, "appointmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: false }),
    __metadata("design:type", String)
], Appointment.prototype, "descriptionTattoo", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)("appointments")
], Appointment);
