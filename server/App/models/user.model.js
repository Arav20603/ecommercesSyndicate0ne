import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  phoneNo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)
export default userModel