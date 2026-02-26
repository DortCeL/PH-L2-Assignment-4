import { prisma } from "../lib/prisma"

const categoryNames = [
    "Pain Relief",
    "Vitamins & Supplements",
    "Antibiotics",
    "Cold & Flu",
    "Digestive Health",
    "Skin Care",
    "First Aid",
    "Allergy & Sinus",
]

const seedCategory = async () => {
    try {
        for (const name of categoryNames) {
            const isExists = await prisma.category.findUnique({
                where: { name },
            })
            if (isExists) {
                console.log(`Category "${name}" already exists`)
                continue
            }
            await prisma.category.create({
                data: { name },
            })
            console.log(`Category "${name}" created successfully`)
        }
    } catch (error) {
        console.log(error)
    } finally {
        await prisma.$disconnect()
    }
}

seedCategory()
