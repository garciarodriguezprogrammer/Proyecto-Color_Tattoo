import express from "express";
import appoinmentRoutes from "./routes/appointments.routes";
import artistRoutes from "./routes/artists.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import adminAuthRoutes from "./routes/adminAuth.routes";
// -----------------------------------------------------------------------------

const router = express.Router();

router.use("/api/appointments", appoinmentRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/artist", artistRoutes);
router.use("/api/adminAuth", adminAuthRoutes);

export default router;
