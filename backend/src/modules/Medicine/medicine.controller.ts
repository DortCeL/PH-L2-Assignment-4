import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import { MedicineService } from "./medicine.service"

const createMedicine = async (req: Request, res: Response) => {
    try {
        const result = await MedicineService.createMedicineIntoDB(req.body)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Medicine created successfully",
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

const getAllMedicine = async (req: Request, res: Response) => {
    try {
        const result = await MedicineService.getAllMedicineFromDB()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine retrieved successfully",
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

const getMedicineById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await MedicineService.getMedicineByIdFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine retrieved successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Medicine not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Medicine not found"
                    ? "Medicine not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const updateMedicine = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await MedicineService.updateMedicineIntoDB(
            id,
            req.body
        )
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine updated successfully",
            data: result,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Medicine not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Medicine not found"
                    ? "Medicine not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

const deleteMedicine = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        await MedicineService.deleteMedicineFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine deleted successfully",
            data: null,
        })
    } catch (error) {
        const statusCode =
            (error as Error).message === "Medicine not found" ? 404 : 400
        sendResponse(res, {
            statusCode,
            success: false,
            message:
                (error as Error).message === "Medicine not found"
                    ? "Medicine not found"
                    : "Something went wrong",
            data: error,
        })
    }
}

export const MedicineController = {
    createMedicine,
    getAllMedicine,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
}
