import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import jwt from "jsonwebtoken"
import config from "../../config"

const createUserIntoDB = async (payload: any) => {
    const hashPassword = await bcrypt.hash(payload.password, 8)
    const result = await prisma.user.create({
        data: { ...payload, password: hashPassword },
    })
    const { password, ...newResult } = result // omit password from result
    return newResult
}

const loginUserIntoDB = async (payload: {
    email: string
    password: string
}) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    })
    if (!user) throw new Error("User not found")
    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        user.password
    )
    if (!isPasswordMatched) throw new Error("Invalid credentials!!")
    const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        status: user.status,
        email: user.email,
    }
    const token = jwt.sign(userData, config.jwt_secret as string, {
        expiresIn: "1d",
    })
    return {
        token,
        user,
    }
}

export const AuthService = {
    createUserIntoDB,
    loginUserIntoDB,
}
