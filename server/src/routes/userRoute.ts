import express from "express";
import userController from "../controllers/userController.ts";
import jwtMiddleware from "../middlewares/jwtMiddleware.ts";
import bcryptMiddleware from "../middlewares/bcryptMiddleware.ts";

const router = express.Router();

router.post('/register',
    bcryptMiddleware.hashPassword, 
    userController.createNewUser,
    jwtMiddleware.generateAndSendToken
);

router.post('/login', 
    userController.readUserIdAndHashByUsername,
    bcryptMiddleware.comparePassword,
    jwtMiddleware.generateAndSendToken
);

export default router;