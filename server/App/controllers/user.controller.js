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

export const login = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await userModel.findOne({email})
    if (!user) {
      return res.status(400).json({success: false, msg: "User does not exist"})
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      return res.status(400).json({success: false, msg: "Invalid password"})
    }

    res.status(201).json({
      success: true,
      msg: "User logged in succesfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    res.status(400).json({success: false, msg: "Error in user login", error: error})
  }
}

export const logout = async (req, res) => {
  try {
    res.status(201).json({success: true, msg: "Successfully logged out"})
  } catch (error) {
     res.status(400).json({success: false, msg: "Error in user logout", error: error})
  }
}