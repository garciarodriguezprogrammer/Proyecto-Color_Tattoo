"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    // Suponiendo que el rol del usuario está disponible en req.user después de la autenticación
    console.log(req.user);
    if (req.user && req.user.rol === "admin") {
        next();
    }
    else {
        res.status(403).json({
            message: "Access denied. Requires admin role."
        });
    }
};
exports.default = isAdmin;
