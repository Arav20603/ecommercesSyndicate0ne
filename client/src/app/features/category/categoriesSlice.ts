import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category, CreateCategoryProps } from "../../../constants/types";

export interface initialStateProps {
  items: Category[],
  loading: boolean,
  error: any | null,
}

const initialState: initialStateProps = {
  items: [],
  loading: false,
  error: null
}

const API_URL: string = 'http://localhost:5000/api/web/ecommerce';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await axios.get(`${API_URL}/getCategory`);
    console.log(res)
    return res.data.category
  }
)

export const updateCategories = createAsyncThunk(
  'categories/updateCategories',
  async (updatedData: Category) => {
    const res = await axios.put(`${API_URL}/updateCategory/${updatedData._id}`, updatedData)
    console.log(res)
    return res.data
  }
)

export const deleteCategories = createAsyncThunk(
  'categories/deleteCategories',
  async (_id: string) => {
    const res = await axios.delete(`${API_URL}/deleteCategory/${_id}`)
    console.log(res)
    return _id
  }
)


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
      console.log(state.items)
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = true
      state.error = action.error.message
      console.log(state.error)
    })
    
    builder
    .addCase(deleteCategories.pending, (state) => {
      state.loading = true
    })
    .addCase(deleteCategories.fulfilled, (state, action) => {
      state.loading = false
      state.items = state.items.filter((item) => item._id !== action.payload)
    })
    .addCase(deleteCategories.rejected, (state, action) => {
      state.loading = true
      state.error = action.error.message
    })
    builder
    .addCase(updateCategories.pending, (state) => {
      state.loading = true
    })
    .addCase(updateCategories.fulfilled, (state, action) => {
      state.loading = false
      state.items = state.items.map(item =>
        item._id === action.payload._id ? {...item, ...action.payload} : item
      )
    })
    .addCase(updateCategories.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Failed to update category';
    })
  }
})

export default categoriesSlice.reducer