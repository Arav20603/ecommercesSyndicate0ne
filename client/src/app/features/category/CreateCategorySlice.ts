import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { CreateCategoryProps, CreateCategoryState } from "../../../constants/types"
import axios from "axios";


const initialState: CreateCategoryState = {
  newData: {
    name: '',
    description: '',
    image: ''
  },
  error: null,
  isCreating: false
}

const API_URL: string = 'http://localhost:5000/api/web/ecommerce';

export const createCategories = createAsyncThunk(
  'categories/createCategories',
  async (newData: CreateCategoryProps) => {
    const res = await axios.post(`${API_URL}/createCategory`, newData)
    console.log(res)
    return res.data
  }
)

const createCategoriesSlice = createSlice({
  name: 'createCategories',
  initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
    .addCase(createCategories.pending, (state) => {
      state.isCreating = true;
    })
    .addCase(createCategories.fulfilled, (state, action) => {
      state.newData = action.payload
      state.isCreating = false
    })
    .addCase(createCategories.rejected, (state, action) => {
      state.isCreating = true,
      state.error = action.error.message
    })
  }
})

export default createCategoriesSlice.reducer