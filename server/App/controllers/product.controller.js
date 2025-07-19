import productModel from "../models/product.model.js"

export const getProducts = async (req, res) => {
  try {
    let enquiry = await productModel.find();
    res.status(201).json({success: true, msg: "Products found", products: enquiry})
  } catch (error) {
    res.status(400).json({success: false,msg: "Error getting product", error: error})
  }
}

export const addProduct = async (req, res) => {
  try {
    let { name, category, description, image, count } = req.body
    name = name?.toLowerCase()
    category = category?.toLowerCase()
    description = description?.toLowerCase()
    let enquiry = new productModel({
      name,
      description,
      image,
      category,
      count
    })
    await enquiry.save()

    res.status(201).json({success: true, msg: "Added product", product: enquiry})

  } catch (error) {
    res.status(400).json({success: false,msg: "Error Adding product", error: error})
  }
}

export const getProductByName = async (req, res) => {
  try {
    let name = req.body
    name = name?.toLowerCase()
    let enquiry = await productModel.find(name);
    if (!enquiry) res.status(404).json({success: false,msg: "Error getting products"})
    res.status(200).json({success: true, msg: "Retreived product", product: enquiry})
  } catch (error) {
    res.status(500).json({success: false,msg: "Error getting products", error: error}) 
  }
}

export const getProductByCategory = async (req, res) => {
  try {
    let category = req.body
    category = category?.toLowerCase()
    let enquiry = await productModel.find(category);
    if (!enquiry) res.status(404).json({success: false,msg: "Error getting products"})
    res.status(200).json({success: true, msg: "Retreived product from the categories", product: enquiry})
  } catch (error) {
    res.status(500).json({success: false,msg: "Error getting products", error: error}) 
  }
}

export const getProductById = async (req, res) => {
  try {
    let productId = req.params.id
    const enquiry = await productModel.findById(productId)
    if (!enquiry) {
     res.status(404).json({success: false,msg: "Error in getting product"}) 
    }
    res.status(200).json({success: true, msg: "Retreived product", product: enquiry})
  } catch (error) {
    res.status(500).json({success: false,msg: "Error getting product", error: error})
  }
}

export const deleteProduct = async (req, res) => {
  try {
    let {id} = req.params
    const enquiry = await productModel.findByIdAndDelete(id)
    if (!enquiry) res.status(200).json({success: true, msg: "Product not found"})
    res.status(200).json({success: true, msg: "Deleted product", product: enquiry})
  } catch (error) {
    res.status(500).json({success: false, msg: "Error deleting product", error: error})
    console.log(error)
  }
}

export const updateProduct = async (req, res) => {
  try {
    let id = req.params.id
    let { name, description, image, count, category } = req.body
    name = name?.toLowerCase()
    category = category?.toLowerCase()
    description = description?.toLowerCase()
    const updateObj = {
      id, name, description, image, count, category
    }
    let enquiry = await productModel.updateOne({_id: id}, updateObj)
    if (!enquiry) res.status(500).json({success: false,msg: "Error updating product"})
    res.status(200).json({success: true, msg: "Product updated", product: enquiry})
  } catch (error) {
    res.status(500).json({success: false,msg: "Error updating product", error: error})
    console.log(error)
  }
}