import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { UserStateProps } from "../../../constants/types"
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.items = null
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer