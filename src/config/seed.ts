import { prisma } from "config/client";
import { hashPassword } from "services/user.service";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    const defaultPassword = await hashPassword('123456');
    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                { name: "ADMIN", description: "Admin thì full quyền" },
                { name: "USER", description: "User thông thường" },
            ],
        }
        );
    }
    if (countUser === 0) {
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        });
        const userRole = await prisma.role.findFirst({
            where: { name: "USER" }
        });
        if (adminRole && userRole) {
            await prisma.user.createMany({
                data: [
                    { fullName: "Admin", username: "admin", password: defaultPassword, accountType: "ADMIN", phone: "0123456789", address: "Hà Nội", roleId: adminRole.id },
                    { fullName: "User", username: "user", password: defaultPassword, accountType: "USER", phone: "0987654321", address: "Hà Nội", roleId: userRole.id },
                ],
            }
            );
        }

    }
    if (countUser > 0 && countRole > 0) {
        console.log("Users already exist in the database. Skipping seeding.");
    }

}
export default initDatabase;