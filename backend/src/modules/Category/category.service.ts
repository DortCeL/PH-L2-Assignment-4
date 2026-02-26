import { prisma } from "../../lib/prisma"

const createCategoryIntoDB = async (payload: { name: string }) => {
    const result = await prisma.category.create({
        data: payload,
    })
    return result
}

const getAllCategoriesFromDB = async () => {
    const result = await prisma.category.findMany({
        orderBy: { name: "asc" },
    })
    return result
}

const getCategoryByIdFromDB = async (id: string) => {
    const result = await prisma.category.findUnique({
        where: { id },
        include: { medicines: true },
    })
    if (!result) throw new Error("Category not found")
    return result
}

const updateCategoryIntoDB = async (
    id: string,
    payload: { name: string }
) => {
    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) throw new Error("Category not found")
    const result = await prisma.category.update({
        where: { id },
        data: payload,
    })
    return result
}

const deleteCategoryFromDB = async (id: string) => {
    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) throw new Error("Category not found")
    const result = await prisma.category.delete({
        where: { id },
    })
    return result
}

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getCategoryByIdFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB,
}
