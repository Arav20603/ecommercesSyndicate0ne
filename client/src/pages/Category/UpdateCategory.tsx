import React, { useEffect, useState } from 'react'
import type { Category, CreateCategoryProps } from '../../constants/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateCategories } from '../../app/features/category/categoriesSlice'
import Categories from './Categories'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateCategory = () => {
  const { id: itemId = '' } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const {items, loading, error} = useAppSelector(state => state.categories)
  const [formData, setFormData] = useState<Category>({
    _id: '',
    name: '',
    description: '',
    image: '',
    category: ''
  })

  const navigate = useNavigate()
  
  useEffect(() => {
    const data = items.find(item => itemId === item._id)
    if (data) {
      setFormData({
        category: data.category || '',
        _id: data._id || '',
        name: data.name || '',
        description: data.description || '',
        image: data.image || ''
      })
    }
  }, [])

  const handleSubmit = (e: any) => {
      e.preventDefault()
      console.log(formData)
      dispatch(updateCategories(formData))
      alert('Category updated sucessfully')
      setFormData({
        _id: '',
        name: '',
        description: '',
        image: '',
        category: ''
      })
      navigate('/')
    }

    if (loading) return <p>Loading.....</p>
    if (error) return <p>Error updating category..... {error}</p>

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-5'>
        <h1>Add a category</h1>

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

        {/* image field */}
        <label>Image link: </label>
        <textarea name='image' placeholder='Paste image link here' className='border-1 w-2/7 p-3 ml-5'
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
        />

        {/* submit btn */}
        <div className="flex gap-10 ml-10">
          <button type='submit' className='bg-blue-700 text-white p-3 rounded-2xl'>Update Category</button>
          <button type='button' onClick={() => navigate('/')} className='bg-blue-700 text-white p-3 rounded-2xl'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCategory
