"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointments_routes_1 = __importDefault(require("./routes/appointments.routes"));
const artists_routes_1 = __importDefault(require("./routes/artists.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const adminAuth_routes_1 = __importDefault(require("./routes/adminAuth.routes"));
// -----------------------------------------------------------------------------
const router = express_1.default.Router();
router.use("/api/appointments", appointments_routes_1.default);
router.use("/api/auth", auth_routes_1.default);
router.use("/api/users", users_routes_1.default);
router.use("/api/artist", artists_routes_1.default);
router.use("/api/adminAuth", adminAuth_routes_1.default);
exports.default = router;
