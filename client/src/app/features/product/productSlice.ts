import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import type { ProductProps, ProductStateProps } from "../../../constants/types";

const initialState: ProductStateProps = {
  items: [],
  loading: false,
  error: null
}

const API_URL: string = 'http://localhost:5000/api/web/ecommerce';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get(`${API_URL}/getProducts`);
    console.log(res.data)
    return res.data.products;
  } 
)

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (data: ProductProps) => {
    const res = await axios.post(`${API_URL}/addProduct`, data)
    console.log(res.data)
    return res.data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id: string) => {
    const res = await axios.delete(`${API_URL}/deleteProduct/${_id}`)
    console.log(res.data)
    return _id
  }
)

export const updateProduct = createAsyncThunk(
  'products/updataProduct', 
  async (data: ProductProps) => {
    const res= await axios.put(`${API_URL}/updateProduct/${data._id}`, data)
    console.log(res.data)
    return res.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      console.log(state.items)
      state.loading = false;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder
    .addCase(addProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(addProduct.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    })
    builder
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter(item => item._id !== action.payload)
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = true
      state.error = action.error.message
    })
    builder
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.map(item => (
        item._id == action.payload._id ? {...item, ...action.payload} : item
      ))
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    })
  }
})

export default productSlice.reducer