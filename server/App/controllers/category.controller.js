import categoryModel from "../models/category.model.js"

export const createCategory = async (req, res) => {
  let { name, description, image } = req.body

  try {
    const categoryAlreadyExists = await categoryModel.findOne({name})
    if (categoryAlreadyExists) {
      return res.status(400).json({success:false, msg: "Category already exists", err: error})
    }

    let enquiry = new categoryModel({
      name,
      description,
      image
    })
    await enquiry.save()

    res.status(201).json({
      success: true,
      msg: 'Category created successfully',
      enquiry: {
        ...enquiry._doc,
      }
    })
  } catch (error) {
    res.status(400).json({success: false, msg: "Error creating category", err: error})
  }
}

export const getCategory = async (req, res) => {
  try {
    let enquiry = await categoryModel.find()
    res.status(201).json({success: true, msg: "Categories found", category: enquiry})
  } catch (error) {
    res.status(400).json({success: false, msg: "Error getting categories", err: error})
  }
}

export const deleteCategory = async (req, res) => {
  try {
    let enId = req.params.id
    let enquiry = await categoryModel.deleteOne({_id: enId})
    res.status(201).json({success: true, msg: "Category deleted", category: enquiry})
  } catch (error) {
    res.status(400).json({success: false, msg: "Error deleting category", err: error})
  }
}

export const updateCategory = async (req, res) => {
    try {
      let enqId = req.params.id
      let {name, description, image} = req.body
      let updateObj = {
          enqId,
          name,
          description,
          image
      }
      let updateRes = await categoryModel.updateOne({_id:enqId},updateObj)
      res.status(201).json({success: true, msg: "Category Updated", category: updateRes})
    } catch (error) {
      res.status(400).json({success: false, msg: "Error Updating category", err: error})
    }
}