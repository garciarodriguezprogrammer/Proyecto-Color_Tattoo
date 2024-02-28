import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (req.user && req.user.rol === "admin") {
        next();
    } else {
        res.status(403).json({
            message: "Access denied. Requires admin role."
        });
    }
};

export default isAdmin;
