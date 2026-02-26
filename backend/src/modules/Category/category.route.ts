import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "../../types/types"
import { CategoryController } from "./category.controller"

const router = express.Router()

router
    .route("/")
    .get(CategoryController.getAllCategories)
    .post(auth(UserRole.admin), CategoryController.createCategory)

router
    .route("/:id")
    .get(auth(UserRole.admin), CategoryController.getCategoryById)
    .patch(auth(UserRole.admin), CategoryController.updateCategory)
    .delete(auth(UserRole.admin), CategoryController.deleteCategory)

export const CategoryRoutes = router
