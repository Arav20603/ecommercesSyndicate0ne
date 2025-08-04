import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {
  let {name, email, phoneNo, password} = req.body
  try {
    if (!name || !email || !password) {
      throw new Error('All fields are required.') 
    }

    const userExists = await userModel.findOne({email})
    if (userExists) {
      return res.status(400).json({success: false, msg: "User Already exists"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    let user = new userModel({
      name, email, phoneNo, password: hashedPassword
    })

    await user.save()

    res.status(200).json({
      success: true,
      msg: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    res.status(400).json({success: false, msg: "Error in creating user", error: error})
  }

}