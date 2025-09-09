import { ACCOUNT_TYPE } from "config/constant";
import { prisma } from "../config/client";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    const hashedPassword = await bcrypt.hash(plainText, saltRounds);
    return hashedPassword;
}

const handleCreateUser = async (
    name: string,
    email: string,
    address: string,
    phone: string,
    avatar: string,
    role: string
) => {
    const defaultPassword = await hashPassword('123456');
    const newUser = await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            address: address,
            accountType: ACCOUNT_TYPE.SYSTEM,
            password: defaultPassword,
            avatar: avatar,
            phone: phone,
            roleId: parseInt(role)
        }
    });
    return newUser;

}
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const handleDeleteUser = async (id: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    return deletedUser;
}

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    return user;
}

const updateUserById = async (
    id: string
    , fullName: string
    , phone: string
    , role: string
    , address: string
    , avatar: string
) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            fullName: fullName,
            phone: phone,
            roleId: parseInt(role),
            address: address,
            ...(avatar !== undefined && { avatar: avatar })
        }
    });
    return updatedUser;
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword };