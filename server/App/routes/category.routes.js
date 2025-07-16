import express from 'express'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/category.controller.js'

const router = express.Router()

router.post('/createCategory', createCategory)
router.get('/getCategory', getCategory)
router.put('/updateCategory/:id', updateCategory)
router.delete('/deleteCategory/:id', deleteCategory)

export default router