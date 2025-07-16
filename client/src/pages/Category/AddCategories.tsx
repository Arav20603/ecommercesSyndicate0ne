import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { CreateCategoryProps } from '../../constants/types'
import { createCategories } from '../../app/features/category/CreateCategorySlice'

const AddCategories = () => {
  const dispatch = useAppDispatch()
  const { isCreating, error } = useAppSelector(state => state.createCategories)

  const [ formData, setFormData ] = useState<CreateCategoryProps>({
    name: '',
    description: '',
    image: ''
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
    dispatch(createCategories(formData))
    alert('Category created sucessfully')
    setFormData({
      name: '',
      description: '',
      image: ''
    })
  }

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
      image: ''
    })
  }

  if (isCreating) return <p>Creating Category....</p>
  if (error) return <p>Error Creating Category.... {error}</p>

  return (
    <div>
      Create Categories

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
          <button type='submit' className='bg-blue-700 text-white p-3 rounded-2xl'>Add Category</button>
          <button type='button' onClick={handleClear} className='bg-blue-700 text-white p-3 rounded-2xl'>Clear entries</button>
        </div>
      </form>
    </div>
  )
}

export default AddCategories
