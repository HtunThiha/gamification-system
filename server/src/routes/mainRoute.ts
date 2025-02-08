import express from "express";
import userRoutes from "./userRoutes.ts";

const router = express.Router();

router.use('/user', userRoutes);

export default router;