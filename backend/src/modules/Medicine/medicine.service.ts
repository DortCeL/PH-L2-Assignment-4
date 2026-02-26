import { prisma } from "../../lib/prisma"

type MedicinePayload = {
    name: string
    description: string
    price: number
    stock: number
    manufacturer: string
    image?: string
    categoryId: string
}

const createMedicineIntoDB = async (payload: MedicinePayload) => {
    const result = await prisma.medicine.create({
        data: payload,
    })
    return result
}

const getAllMedicineFromDB = async () => {
    const result = await prisma.medicine.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
    })
    return result
}

const getMedicineByIdFromDB = async (id: string) => {
    const result = await prisma.medicine.findUnique({
        where: { id },
        include: { category: true },
    })
    if (!result) throw new Error("Medicine not found")
    return result
}

const updateMedicineIntoDB = async (
    id: string,
    payload: Partial<MedicinePayload>
) => {
    const existing = await prisma.medicine.findUnique({ where: { id } })
    if (!existing) throw new Error("Medicine not found")
    const result = await prisma.medicine.update({
        where: { id },
        data: payload,
    })
    return result
}

const deleteMedicineFromDB = async (id: string) => {
    const existing = await prisma.medicine.findUnique({ where: { id } })
    if (!existing) throw new Error("Medicine not found")
    const result = await prisma.medicine.delete({
        where: { id },
    })
    return result
}

export const MedicineService = {
    createMedicineIntoDB,
    getAllMedicineFromDB,
    getMedicineByIdFromDB,
    updateMedicineIntoDB,
    deleteMedicineFromDB,
}
