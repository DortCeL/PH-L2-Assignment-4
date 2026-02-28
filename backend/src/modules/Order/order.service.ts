import { prisma } from "../../lib/prisma"

const db = prisma as any

type OrderItemInput = {
    medicineId: string
    quantity: number
}

type CreateOrderPayload = {
    address: string
    items: OrderItemInput[]
}

type UpdateOrderForCustomerPayload = {
    address?: string
    status?: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
}

type UpdateOrderStatusPayload = {
    status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
}

const createOrderForCustomer = async (
    customerId: string,
    payload: CreateOrderPayload,
) => {
    const { address, items } = payload

    if (!items || items.length === 0) {
        throw new Error("Order items are required")
    }

    const medicineIds = items.map((item) => item.medicineId)

    const medicines = await prisma.medicine.findMany({
        where: {
            id: {
                in: medicineIds,
            },
        },
        select: {
            id: true,
            price: true,
        },
    })

    if (medicines.length !== medicineIds.length) {
        throw new Error("One or more medicines not found")
    }

    let totalAmount = 0

    const orderItemsData = items.map((item) => {
        const medicine = medicines.find((m) => m.id === item.medicineId)
        if (!medicine) {
            throw new Error("Medicine not found")
        }
        const price = medicine.price
        totalAmount += price * item.quantity
        return {
            medicineId: item.medicineId,
            quantity: item.quantity,
            price,
        }
    })

    const order = await db.order.create({
        data: {
            customerId,
            address,
            totalAmount,
            orderItems: {
                create: orderItemsData,
            },
        },
        include: {
            customer: true,
            orderItems: {
                include: {
                    medicine: {
                        include: {
                            seller: true,
                            category: true,
                        },
                    },
                },
            },
        },
    })

    return order
}

const getCustomerOrdersFromDB = async (customerId: string) => {
    const orders = await db.order.findMany({
        where: {
            customerId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            orderItems: {
                include: {
                    medicine: {
                        include: {
                            seller: true,
                            category: true,
                        },
                    },
                },
            },
        },
    })

    return orders
}

const getCustomerOrderByIdFromDB = async (
    customerId: string,
    orderId: string,
) => {
    const order = await db.order.findFirst({
        where: {
            id: orderId,
            customerId,
        },
        include: {
            customer: true,
            orderItems: {
                include: {
                    medicine: {
                        include: {
                            seller: true,
                            category: true,
                        },
                    },
                },
            },
        },
    })

    if (!order) {
        throw new Error("Order not found")
    }

    return order
}

const updateOrderForCustomer = async (
    customerId: string,
    orderId: string,
    payload: UpdateOrderForCustomerPayload,
) => {
    const existing = await db.order.findFirst({
        where: {
            id: orderId,
            customerId,
        },
    })

    if (!existing) {
        throw new Error("Order not found")
    }

    const data: UpdateOrderForCustomerPayload = {}

    if (payload.address !== undefined) {
        data.address = payload.address
    }
    if (payload.status !== undefined) {
        data.status = payload.status
    }

    const updatedOrder = await db.order.update({
        where: {
            id: orderId,
        },
        data,
    })

    return updatedOrder
}

const deleteOrderForCustomer = async (customerId: string, orderId: string) => {
    const existing = await db.order.findFirst({
        where: {
            id: orderId,
            customerId,
        },
    })

    if (!existing) {
        throw new Error("Order not found")
    }

    const deletedOrder = await db.order.delete({
        where: {
            id: orderId,
        },
    })

    return deletedOrder
}

const getSellerOrdersFromDB = async (sellerId: string) => {
    const orders = await db.order.findMany({
        where: {
            orderItems: {
                some: {
                    medicine: {
                        sellerId,
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: true,
            orderItems: {
                include: {
                    medicine: {
                        include: {
                            seller: true,
                            category: true,
                        },
                    },
                },
            },
        },
    })

    return orders
}

const getSellerOrderByIdFromDB = async (sellerId: string, orderId: string) => {
    const order = await db.order.findFirst({
        where: {
            id: orderId,
            orderItems: {
                some: {
                    medicine: {
                        sellerId,
                    },
                },
            },
        },
        include: {
            customer: true,
            orderItems: {
                include: {
                    medicine: {
                        include: {
                            seller: true,
                            category: true,
                        },
                    },
                },
            },
        },
    })

    if (!order) {
        throw new Error("Order not found")
    }

    return order
}

const updateOrderStatusBySellerIntoDB = async (
    sellerId: string,
    orderId: string,
    payload: UpdateOrderStatusPayload,
) => {
    const existing = await db.order.findFirst({
        where: {
            id: orderId,
            orderItems: {
                some: {
                    medicine: {
                        sellerId,
                    },
                },
            },
        },
    })

    if (!existing) {
        throw new Error("Order not found")
    }

    const updatedOrder = await db.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: payload.status,
        },
    })

    return updatedOrder
}

export const OrderService = {
    createOrderForCustomer,
    getCustomerOrdersFromDB,
    getCustomerOrderByIdFromDB,
    updateOrderForCustomer,
    deleteOrderForCustomer,
    getSellerOrdersFromDB,
    getSellerOrderByIdFromDB,
    updateOrderStatusBySellerIntoDB,
}
