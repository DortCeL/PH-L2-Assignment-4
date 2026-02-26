import express, { Application, Request, Response } from "express"
import cors from "cors"
import { AuthRoutes } from "./modules/Auth/auth.route"
import { CategoryRoutes } from "./modules/Category/category.route"
import { MedicineRoutes } from "./modules/Medicine/medicine.route"

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
// app.use('/api/v1', router);
app.use("/api/auth", AuthRoutes)
app.use("/api/categories", CategoryRoutes)
app.use("/api/medicine", MedicineRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Apollo Gears World!")
})

export default app
