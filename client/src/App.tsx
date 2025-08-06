import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Categories from './pages/admin/Category/Categories'
import UpdateCategory from './pages/admin/Category/UpdateCategory'
import AddCategories from './pages/admin/Category/AddCategories'
import Products from './pages/admin/Products/Products'
import AddProduct from './pages/admin/Products/AddProduct'
import UpdateProduct from './pages/admin/Products/UpdateProduct'
import CategoryDetailPage from './pages/web/Category/CategoryDetailPage'
import ProductDetailPage from './pages/web/Products/ProductDetailPage'
import Login from './pages/web/user/Login'
import SignUp from './pages/web/user/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/category-edit/:id' element={<UpdateCategory />} />
        <Route path='/add-category' element={<AddCategories />} />
        <Route path='/product' element={<Products />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/update-product/:_id' element={<UpdateProduct />} />
        <Route path='/category-detail/:_id' element={<CategoryDetailPage />} />
        <Route path='/product-detail/:_id' element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
