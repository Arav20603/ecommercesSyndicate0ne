import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { UserCreateProps, UserStateProps } from "../../../constants/types"
import axios from "axios"

export interface FormProps {
  email: string,
  password: string
}

const initialState: UserStateProps = {
  items: null,
  loading: false,
  error: null
}

const API_URL: string = 'http://localhost:5000/api/web/ecommerce';

export const fetchUser = createAsyncThunk(
  'user/login',
  async (userData: FormProps) => {
    const res = await axios.post(`${API_URL}/login`, userData)
    console.log(res.data)
    return res.data.user
  }
)

export const createUser = createAsyncThunk(
  'user/signup',
  async (userData: UserCreateProps) => {
    const res = await axios.post(`${API_URL}/signup`, userData)
    console.log(res)
    return res.data.user
  }
)

export const logOut = createAsyncThunk(
  'user/logout',
  async () => {
    const res = await axios.post(`${API_URL}/logout`)
    console.log(res)
    return res.data.user
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.items = null
      state.error = action.error.message
    })
    builder
    .addCase(createUser.pending, (state) => {
      state.loading = true
    })
    .addCase(createUser.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(createUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder
    .addCase(logOut.pending, (state) => {
      state.loading = true
    })
    .addCase(logOut.fulfilled, (state) => {
      state.loading = false
      state.items = null
      localStorage.clear()
    })
    .addCase(logOut.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer