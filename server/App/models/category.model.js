import mongoose, { Schema } from "mongoose";

let categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
},  {timestamps: true})

let categoryModel = mongoose.model('Category', categorySchema)
export default categoryModel