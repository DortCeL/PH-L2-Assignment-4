import { prisma } from "../lib/prisma"
import { UserRole } from "../types/types"
import bcrypt from "bcryptjs"

const seedAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash("123456", 8)
        const adminData = {
            name: "Admin",
            email: "admin@gmail.com",
            role: UserRole.admin,
            password: hashedPassword,
        }
        // 1. admin already exists
        const isExists = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        })
        // 2. if exists then return
        if (isExists) {
            console.log("Admin already exists")
            return
        }
        // 3. if not then create
        const admin = await prisma.user.create({
            data: adminData,
        })
        console.log("Admin created successfully")
    } catch (error) {
        console.log(error)
    } finally {
        await prisma.$disconnect()
    }
}

seedAdmin()
