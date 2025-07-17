import express from 'express'
import { addProduct, deleteProduct, getProductByCategory, getProductById, getProductByName, getProducts, updateProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/getProducts', getProducts)
router.post('/addProduct', addProduct)
router.get('/getProduct/:id', getProductById)
router.get('/getProductByName', getProductByName)
router.get('/getProductByCategory', getProductByCategory)
router.delete('/deleteProduct/:id', deleteProduct)
router.put('/updateProduct/:id', updateProduct)

export default router