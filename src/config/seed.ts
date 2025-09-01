import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countRole === 0) { }
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                { username: "admin", password: "admin123", fullName: "Admin User", accountType: "ADMIN", },
                { username: "user1", password: "user123", fullName: "User One", accountType: "USER" },
                { username: "user2", password: "user123", fullName: "User Two", accountType: "USER" },
            ],
        }
        );
    } else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                { name: "ADMIN", description: "Admin thì full quyền" },
                { name: "USER", description: "User thông thường" },
            ],
        }
        );
    } else {
        console.log("Users already exist in the database. Skipping seeding.");
    }

}
export default initDatabase;