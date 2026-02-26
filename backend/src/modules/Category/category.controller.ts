import { Request, Response } from "express"
import { CategoryService } from "./category.service"
import sendResponse from "../../utils/sendResponse"

const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.createCategoryIntoDB(req.body)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Category created successfully",
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

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.getAllCategoriesFromDB()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Categories retrieved successfully",
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

const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await CategoryService.getCategoryByIdFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category retrieved successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Category not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Category not found"
                    ? "Category not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await CategoryService.updateCategoryIntoDB(id, req.body)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category updated successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Category not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Category not found"
                    ? "Category not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        await CategoryService.deleteCategoryFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Category deleted successfully",
            data: null,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Category not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Category not found"
                    ? "Category not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

export const CategoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}
