import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  count: {
    type: Number,
    default: 1,
    required: false
  }
}, {timestamps: true})

let productModel = mongoose.model('Product', productSchema)
export default productModel