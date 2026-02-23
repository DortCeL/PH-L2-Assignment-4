import { NextFunction, Request, Response } from "express"
import { UserRole, UserStatus } from "../types/types"
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../lib/prisma"
import config from "../config"

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith("Bearer "))
                throw new Error("Invalid token")
            const token = authHeader.split(" ")[1]
            const decoded = jwt.verify(
                token,
                config.jwt_secret as string
            ) as JwtPayload
            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            })
            if (!userData) throw new Error("could not find user!")
            if (userData.status !== UserStatus.active)
                throw new Error("Sorry, your account is suspended!!!")
            if (roles.length && !roles.includes(decoded.role))
                throw new Error("Unauthorized!")

            req.user = decoded
            next()
        } catch (error) {}
    }
}
export default auth
