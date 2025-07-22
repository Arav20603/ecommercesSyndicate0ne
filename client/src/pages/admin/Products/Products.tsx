import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteProduct, fetchProducts } from '../../../app/features/product/productSlice'
import { Link, useNavigate } from 'react-router-dom'

const Products = () => {
  const dispatch = useAppDispatch()
  const {items, loading, error} = useAppSelector(state => state.products)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = (_id: string) => {
    if (window.confirm("Do u want to delete?") === true) {
      try {
      dispatch(deleteProduct(_id))
      alert('Product deleted successfully')
    } catch (error) {
      alert("Error deleting Product")
      console.log(error)
    }
    } else console.log("You pressed cancel")
  }

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error in getting products....</p>

  return (
    <div className='ml-10'>
      <div className="flex justify-between mx-20 my-5">
        <h1 className="text-4xl">Products</h1>
        <Link to='/add-product'> <h1 className="bg-blue-700 p-3 w-40 text-white rounded-2xl text-center">Add Product</h1></Link>
        <Link to='/'> <h1 className="bg-red-500 p-3 w-40 text-white rounded-2xl text-center">Home Page</h1></Link>
      </div>
       {items.length === 0 ? (
        <p>No items so far.....</p>
      ) : (
        <ul className='ml-5 grid grid-cols-3 gap-10'>
          {items.map((item) => (
            <li key={item._id}>
              <p>Product Name: {item.name}</p>
              <p>Description: {item.description}</p>
              <p>Category: {item.category}</p>
              <p>Quantity: {item.count}</p>
              <img src={item.image} alt={item.name} className='w-40 h-30' />
              <div className="flex gap-4 mt-2">
                <button onClick={() => navigate(`/update-product/${item._id}`)} className='bg-blue-500 p-3'>Edit</button>
                <button onClick={() => handleDelete(item._id)} className='bg-red-500 p-3'>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      
    </div>
  )
}

export default Products
