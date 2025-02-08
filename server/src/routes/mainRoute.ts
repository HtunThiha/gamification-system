import express from "express";
import userRoutes from "./userRoute.ts";

const router = express.Router();

router.use('/user', userRoutes);

export default router;