import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import sendResponse from "../../utils/sendResponse"

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.createUserIntoDB(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User Created",
            data: result,
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Something went wrong",
            data: error,
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginUserIntoDB(req.body)
        res.cookie("token", result.token, {
            secure: false,
            httpOnly: true,
            sameSite: "strict", // none / strict / lax (lax beshi use hoy production e)
        })
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Logged in successfully",
            data: result,
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Could not log in",
            data: error,
        })
    }
}

export const AuthController = { createUser, loginUser }
