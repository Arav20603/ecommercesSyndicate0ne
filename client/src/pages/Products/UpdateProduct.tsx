import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import type { ProductProps } from '../../constants/types'
import { fetchCategories, updateCategories } from '../../app/features/category/categoriesSlice'
import { fetchProducts, updateProduct } from '../../app/features/product/productSlice'


const UpdateProduct = () => {

  const { _id } = useParams<string>()
  
  const dispatch = useAppDispatch()
  const {items: categoryItems} = useAppSelector(state => state.categories)
  const {items: productItems, loading, error} = useAppSelector(state => state.products)
  const [formData, setFormData] = useState<ProductProps>({
    _id: '',
    name: '',
    description: '',
    image: '',
    count: 0,
    category: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])
  
  useEffect(() => {
    console.log(_id)
      console.log(productItems)
      const data = productItems.find(item => item._id === _id)

      if (data) {
        setFormData({
          _id: data._id || '',
          name: data.name || '',
          description: data.description || '',
          count: data.count,
          image: data.image,
          category: data.category,
        })
      }
  }, [_id, productItems])


  const handleSubmit = (e: any) => {
    e.preventDefault()

    try {
      dispatch(updateProduct(formData))
      alert('Category updated sucessfully')
      setFormData({
        _id: '',
        name: '',
        description: '',
        image: '',
        category: '',
        count: 0
      })
      navigate('/')
    } catch (error) {
      alert('Error updating product')
    }
  }

   const handleClear = () => {
    setFormData({
      _id: '',
      name: '',
      description: '',
      image: '',
      count: 0,
      category: ''
    })
  }


    if (loading) return <p>Loading.....</p>
    if (error) return <p>Error updating category..... {error}</p>

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-5'>
        <h1>Update a Product</h1>

        {/* name field*/}
        <label>Name: </label>
        <input name='name' type="text" placeholder='Enter category name' className='border-1 w-2/7 p-3 ml-5'
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        {/* description field */}
        <label>Description: </label>
        <textarea name='description' placeholder='Enter description if needed' className='border-1 w-2/7 p-3 ml-5'
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        {/* category field */}
        <label>Category</label>
        <select className='ml-5 w-100 border-1 p-2 rounded-lg' value={formData.category} 
          onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option value="" disabled>--select category--</option>
          { categoryItems.map(item => (
            <option key={item.name} value={item.name}
            >{item.name}</option>
          ))}
        </select>

        {/* count field */}
        <label>Quantity</label>
        <input type='number' placeholder='Enter qty available' className='ml-5 p-2 w-45 border-1'
          value={formData.count} onChange={(e) => setFormData({...formData, count: Number(e.target.value)})}
        />

        {/* image field */}
        <label>Image link: </label>
        <textarea name='image' placeholder='Paste image link here' className='border-1 w-2/7 p-3 ml-5'
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
        />

        {/* submit btn */}
        <div className="flex gap-10 ml-10">
          <button type='submit' className='bg-blue-700 text-white p-3 rounded-2xl'>Update Category</button>
          <button onClick={handleClear} type='button' className='bg-red-500 text-white p-3 rounded-2xl'>Clear entries</button>
          <button type='button' onClick={() => navigate('/')} className='bg-blue-700 text-white p-3 rounded-2xl'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
