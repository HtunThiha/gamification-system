import bcrypt from "bcrypt";
import { config } from "dotenv";
import {Request, Response, NextFunction } from "express";

config();

const hashPassword = (req: Request, res: Response, next: NextFunction) => {

    const password = req.body.password;
    const saltRounds = parseInt(process.env.SALT_ROUNDS);

    try {
        const hash = bcrypt.hashSync(password, saltRounds);
        res.locals.hash = hash;
        next();
    } catch (error) {
        console.error("Error hashing password: ", error);
        res.status(500).send();
    }
}

const comparePassword = (req: Request, res: Response, next: NextFunction) => {

    const password = req.body.password;
    const hash = res.locals.hash;

    try {
        const isMatch = bcrypt.compareSync(password, hash);

        if (isMatch) {
            res.locals.response_status = 200;
            next();
        } else {
            res.status(401).json({message: "Incorrect password."});
        }
    } catch (error) {
        console.error("Error comparing password: \n", error);
        res.status(500).send();
    }
}

export default {
    hashPassword,
    comparePassword
}