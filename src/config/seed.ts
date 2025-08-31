import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser > 0) return;
    await prisma.user.createMany({
        data: [
            { username: "admin", password: "admin123", fullName: "Admin User", accountType: "ADMIN" },
            { username: "user1", password: "user123", fullName: "User One", accountType: "USER" },
            { username: "user2", password: "user123", fullName: "User Two", accountType: "USER" },
        ],
    }
    );
}
export default initDatabase;