import express from 'express'
import cors from 'cors'
import { connectDB } from './App/dB/connectDB.js'
import dotenv from 'dotenv'
import categoryRouter from './App/routes/category.routes.js'
import productRouter from './App/routes/product.routes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/web/ecommerce/', categoryRouter)
app.use('/api/web/ecommerce/', productRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port: ${process.env.PORT}`)
  connectDB()
})