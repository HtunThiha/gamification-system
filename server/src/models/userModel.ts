import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { callbackify } from "util";

const prisma = new PrismaClient();

const insertSingleUser = async (data, callback) => {

    await prisma.user.create({
        data, 
        select: {
            user_id: true
        }
    })
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
}

const selectUserIdAndHashByUsername = async (data, callback) => {

    await prisma.user.findUnique({
        where: {username: data.username},
        "select": {
            user_id: true,
            password: true
        }
    })
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
}

export default {
    insertSingleUser,
    selectUserIdAndHashByUsername
}