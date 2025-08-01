import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchCategories } from '../../../app/features/category/categoriesSlice'
import { addProduct } from '../../../app/features/product/productSlice'
import type { ProductProps } from '../../../constants/types'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const dispatch = useAppDispatch()
  const {items, loading, error} = useAppSelector(state => state.categories)

  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])


  const handleClear = () => {
    setName('')
    setCategory('')
    setCount(0)
    setDesc('')
    setPrice(0)
    setImage('')
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!name || !category || !image || !count || !description || !price) return alert("Pls fill name category field")

    try {
      const formData: ProductProps = {
        name, description, image, count, category,price,
        _id: ''
      }
      dispatch(addProduct(formData))
      alert("Product added successfully")
      setName('')
      setCategory('')
      setPrice(0)
      setCount(0)
      setDesc('')
      setImage('')
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <p>Loading.....</p>
  if (error) return <p>Error in adding Product {error}</p>

  return (
    <div>
      
      <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-5 ml-10 border-1 w-150'>
        <h1>Add a Product</h1>

        {/* name field*/}
        <label>Name: </label>
        <input name='name' type="text" placeholder='Enter product name' className='border-1 w-100 p-3 ml-5'
          value={name} onChange={(e) => setName(e.target.value)}
        />

        {/* description field */}
        <label>Description: </label>
        <textarea name='description' placeholder='Enter description if needed' rows={2} className='border-1 w-100 p-3 ml-5'
          value={description} onChange={(e) => setDesc(e.target.value)}
        />

        {/* Price field */}
        <label>Price: </label>
        <input type='number' name='price' placeholder='Enter price of the product' className='border-1 w-100 p-3 ml-5'
          value={price} onChange={(e) => setPrice(Number(e.target.value))}
        />

        {/* category field */}
        <label>Category</label>
        <select className='ml-5 w-100 border-1 p-2 rounded-lg' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>--select category--</option>
          { items.map(item => (
            <option key={item.name} value={item.name}
            >{item.name}</option>
          ))}
        </select>

        {/* count field */}
        <label>Quantity</label>
        <input type='number' placeholder='Enter qty available' className='ml-5 p-2 w-45 border-1'
          value={count} onChange={(e) => setCount(Number(e.target.value))}
        />

        {/* image field */}
        <label>Image link: </label>
        <textarea name='image' placeholder='Paste image link here' className='ml-5 border-1 w-100 p-3'
          value={image} onChange={(e) => setImage(e.target.value)}
        />

        {/* submit btn */}
        <div className="flex gap-10 ml-10">
          <button type='submit' className='bg-blue-700 text-white p-3 rounded-2xl'>Add Category</button>
          <button onClick={handleClear} type='button' className='bg-red-500 text-white p-3 rounded-2xl'>Clear entries</button>
          <button type='button' onClick={() => navigate('/product')} className='bg-green-700 text-white p-3 rounded-2xl'>&larr;Go back</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
