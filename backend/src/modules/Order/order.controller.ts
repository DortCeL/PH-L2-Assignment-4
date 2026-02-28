import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import { OrderService } from "./order.service"

const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id as string

        const result = await OrderService.createOrderForCustomer(
            userId,
            req.body,
        )
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Order created successfully",
            data: result,
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: (error as Error).message,
            data: error,
        })
    }
}

const getCustomerOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id as string
        const result = await OrderService.getCustomerOrdersFromDB(userId)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Orders retrieved successfully",
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

const getCustomerOrderById = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id as string
        const orderId = req.params.id as string
        const result = await OrderService.getCustomerOrderByIdFromDB(
            userId,
            orderId,
        )
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order retrieved successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Order not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Order not found"
                    ? "Order not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const updateCustomerOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id as string
        const orderId = req.params.id as string
        const result = await OrderService.updateOrderForCustomer(
            userId,
            orderId,
            req.body,
        )
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order updated successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Order not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Order not found"
                    ? "Order not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const deleteCustomerOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id as string
        const orderId = req.params.id as string
        await OrderService.deleteOrderForCustomer(userId, orderId)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order deleted successfully",
            data: null,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Order not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Order not found"
                    ? "Order not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const getSellerOrders = async (req: Request, res: Response) => {
    try {
        const sellerId = (req.user as any)?.id as string
        const result = await OrderService.getSellerOrdersFromDB(sellerId)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Orders retrieved successfully",
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

const getSellerOrderById = async (req: Request, res: Response) => {
    try {
        const sellerId = (req.user as any)?.id as string
        const orderId = req.params.id as string
        const result = await OrderService.getSellerOrderByIdFromDB(
            sellerId,
            orderId,
        )
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order retrieved successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Order not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Order not found"
                    ? "Order not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const updateOrderStatusBySeller = async (req: Request, res: Response) => {
    try {
        const sellerId = (req.user as any)?.id as string
        const orderId = req.params.id as string
        const result = await OrderService.updateOrderStatusBySellerIntoDB(
            sellerId,
            orderId,
            req.body,
        )
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order status updated successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Order not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Order not found"
                    ? "Order not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

export const OrderController = {
    createOrder,
    getCustomerOrders,
    getCustomerOrderById,
    updateCustomerOrder,
    deleteCustomerOrder,
    getSellerOrders,
    getSellerOrderById,
    updateOrderStatusBySeller,
}
