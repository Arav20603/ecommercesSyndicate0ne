import productModel from "../models/product.model.js"

export const getProducts = async (req, res) => {
  try {
    let enquiry = await productModel.find();
    res.status(201).json({success: true, msg: "Products found", products: enquiry})
  } catch (error) {
    res.status(400).json({success: false,msg: "Error getting product", error: error})
  }
}