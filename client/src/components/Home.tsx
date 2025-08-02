import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCategories } from '../app/features/category/categoriesSlice'
import { fetchProducts } from '../app/features/product/productSlice'

const Home = () => {
  const dispatch = useAppDispatch()
  const { items: categoryItems, loading, error } = useAppSelector(state => state.categories)
  const { items: productItems } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <h1 className='text-center text-7xl mt-20 underline'>Welcome Mr. Syndicate</h1>
      <div className="flex gap-10 items-center justify-center mt-20">
        <Link to='/category'><p className='bg-blue-700 text-white p-5 text-4xl rounded-2xl w-70 text-center cursor-pointer hover:bg-blue-600'>Category</p></Link>
        <Link to='/product'><p className='bg-gray-600 text-white p-5 text-4xl rounded-2xl w-70 text-center cursor-pointer hover:bg-gray-500'>Product</p></Link>
      </div>

      <h1 className='text-2xl mt-10 underline'>Categories</h1>
      <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap">
        { categoryItems.map(item => (
          <li key={item._id} className='inline-block mr-8'>
            <img src={item.image} alt={item.name} className='w-80 h-60 cursor-pointer'  />
            <div className="flex p-2 gap-4">
              <p className='mb-3'>{item.name}</p>
              <Link to={`category-detail/${item._id}`} className='bg-green-400 p-2 rounded-2xl'>Click here</Link>
              </div>
          </li>
        )) }
      </ul>

      {/* Products */}
      <h1>Products</h1>

      <ul className="grid grid-cols-4">
        { productItems.map(item => (
          <li key={item._id} className=''>
            <img src={item.image} alt={item.name} className='w-60 h-40 cursor-pointer'  />
            <div className="p-2 gap-4">
              <p className='mb-3'>{item.name}</p>
              <button className='bg-orange-500 p-2 rounded-2xl'>Add to cart</button>
              <Link to={`product-detail/${item._id}`} className='bg-yellow-400 p-2 rounded-2xl'>View Detail</Link>
            </div>
          </li>
        )) }
      </ul>
    </>
  )
}

export default Home
