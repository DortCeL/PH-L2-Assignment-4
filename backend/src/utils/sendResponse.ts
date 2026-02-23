import { Response } from "express"

type ResponseType<T> = {
    statusCode: number
    success: boolean
    message: string
    data?: T
}

const sendResponse = <T>(res: Response, data: ResponseType<T>) => {
    const { statusCode, success, message, data: DataResponse } = data
    res.status(statusCode).json({ success, message, data: DataResponse })
}

export default sendResponse
