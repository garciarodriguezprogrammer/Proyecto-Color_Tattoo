import express from "express";
import appoinmentRoutes from "./routes/appointments.routes";
import artistRoutes from "./routes/artists.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes"
// -----------------------------------------------------------------------------

const router = express.Router();

router.use("/api/appointments", appoinmentRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/artist", artistRoutes);

export default router;
