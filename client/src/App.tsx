import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import UpdateCategory from './pages/Category/UpdateCategory'
import AddCategories from './pages/Category/AddCategories'
import AddProduct from './pages/Products/AddProduct'
import UpdateProduct from './pages/Products/UpdateProduct'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category-edit/:id' element={<UpdateCategory />} />
        <Route path='/add-category' element={<AddCategories />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/update-product/:_id' element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
