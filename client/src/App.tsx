import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import UpdateCategory from './pages/Category/UpdateCategory'
import AddCategories from './pages/Category/AddCategories'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category-edit/:id' element={<UpdateCategory />} />
        <Route path='/add-category' element={<AddCategories />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
