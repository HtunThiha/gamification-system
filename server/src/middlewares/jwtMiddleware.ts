import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, SignOptions } from "jsonwebtoken";

config();

const secretKey = process.env.JWT_SECRET_KEY;
const tokenAlgorithm = (process.env.JWT_ALGORITHM as jwt.Algorithm) || "HS256";
const tokenDuration = parseInt(process.env.JWT_DURATION);

const generateAndSendToken = (req: Request, res: Response, next: NextFunction) => {
    const payload = {
        user_id: res.locals.user_id,
        timestamp: new Date()
    };

    const options: SignOptions = {
        algorithm: tokenAlgorithm,
        expiresIn: tokenDuration
    };

    const responseStatus: number = res.locals.response_status;

    const callback = (error: JsonWebTokenError, token: string) => {
        if (error) {
            console.error("Error generating token: \n", error);
            res.status(500).send();
        } else {
            res.status(responseStatus).json({token});
        }
    }

    jwt.sign(payload, secretKey, options, callback);
}

export default {
    generateAndSendToken
}