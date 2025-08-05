import {configureStore} from '@reduxjs/toolkit'
import categoriesReducer from './features/category/categoriesSlice'
import createCategoriesReducer from './features/category/CreateCategorySlice';
import productsReducer from './features/product/productSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    createCategories: createCategoriesReducer,
    products: productsReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;