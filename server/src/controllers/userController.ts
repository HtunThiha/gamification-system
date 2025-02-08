import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const createNewUser = (req: Request, res: Response, next: NextFunction) => {

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results) => {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == "P2002") {
                res.status(409).json({message: "Username already exists."});
            }
        } else if (!(error instanceof PrismaClientKnownRequestError)) {
            console.error("Error creating user: \n", error);
            res.status(500).send();
        } else if (results) {
            res.locals.user_id = results.user_id;
            res.locals.response_status = 201;
            next();
        }
    }

    if (!data.username || !data.email || !data.password) {
        res.status(400).json({message: "Username, email, or password not provided."});
    } else {
        userModel.insertSingleUser(data, callback);
    }
}

const readUserIdAndHashByUsername = (req: Request, res: Response, next: NextFunction) => {

    const data = {
        username: req.body.username
    }

    const callback = (error, results) => {
        if (!results) {
            res.status(404).json({message: "Username not found."});
        } else if (error) {
            console.error("Error reading user_id and hash by username: \n", error);
            res.status(500).send();
        } else {
            res.locals.user_id = results[0].user_id
        }
    }

    userModel.selectUserIdAndHashByUsername(data, callback);
}

export default {
    createNewUser,
    readUserIdAndHashByUsername
}