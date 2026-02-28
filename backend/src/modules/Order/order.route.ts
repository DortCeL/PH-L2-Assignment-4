import express from "express"
import { OrderController } from "./order.controller"
import { UserRole } from "../../types/types"
import auth from "../../middlewares/auth"

const router = express.Router()

// seller routes
router
    .route("/seller")
    .get(auth(UserRole.seller), OrderController.getSellerOrders)

router
    .route("/seller/:id")
    .get(auth(UserRole.seller), OrderController.getSellerOrderById)
    .patch(auth(UserRole.seller), OrderController.updateOrderStatusBySeller)

// customer routes
router
    .route("/")
    .post(auth(UserRole.customer), OrderController.createOrder)
    .get(auth(UserRole.customer), OrderController.getCustomerOrders)

router
    .route("/:id")
    .get(auth(UserRole.customer), OrderController.getCustomerOrderById)
    .patch(auth(UserRole.customer), OrderController.updateCustomerOrder)
    .delete(auth(UserRole.customer), OrderController.deleteCustomerOrder)

export const OrderRoutes = router
