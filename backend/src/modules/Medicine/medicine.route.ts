import express from "express"
import { UserRole } from "../../types/types"
import auth from "../../middlewares/auth"
import { MedicineController } from "./medicine.controller"

const router = express.Router()

router
    .route("/")
    .get(MedicineController.getAllMedicine)
    .post(auth(UserRole.seller), MedicineController.createMedicine)

router
    .route("/:id")
    .get(MedicineController.getMedicineById)
    .patch(auth(UserRole.seller), MedicineController.updateMedicine)
    .delete(auth(UserRole.seller), MedicineController.deleteMedicine)

export const MedicineRoutes = router
