import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import e from "express";
import { comparePassword, hashPassword } from "services/user.service";

const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: email
        }
    });
    if (user) return true;
    return false;
}

const registerNewUser = async (fullName: string, email: string, password: string) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: {
            name: "USER"
        }
    });
    if (userRole) {
        await prisma.user.create({
            data: {
                username: email,
                password: newPassword,
                fullName: fullName,
                roleId: userRole.id,
                accountType: ACCOUNT_TYPE.SYSTEM
            }
        });
    }

}

const handleLogin = async (username: string, password: string, callback: any) => {
    //check exist
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    if (!user) {
        // throw err
        // throw new Error(   `User ${username} not found`);
        return callback(null, false, { message: `Username/password is incorrect` });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        // throw new Error("Password is incorrect");
        return callback(null, false, { message: "Username/password is incorrect" });
    }

    return callback(null, user);
}

export { isEmailExist, registerNewUser, handleLogin };