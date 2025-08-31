import { prisma } from "../config/client";

const handleCreateUser = async (name: string, email: string, address: string) => {
    const newUser = await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            accountType: "USER",
            password: "123456",
            address: address
        }
    });
    return newUser;

}
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
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

const updateUserById = async (id: string, name: string, email: string, address: string) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            fullName: name,
            username: email,
            accountType: "USER",
            password: "123456",
            address: address
        }
    });
    return updatedUser;
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };