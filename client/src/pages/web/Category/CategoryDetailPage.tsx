import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import type { Category } from '../../../constants/types'
import { fetchCategories } from '../../../app/features/category/categoriesSlice'
import { fetchProducts } from '../../../app/features/product/productSlice'

const CategoryDetailPage = () => {
  const { _id } = useParams<string>()
  const dispatch = useAppDispatch()
  const {items: categoryItems, loading, error} = useAppSelector(state => state.categories)
  const {items: productItems} = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])

  const category = categoryItems.find(item => _id === item._id)
  const filteredProducts = productItems.filter(item => item.category === category?.name.toLowerCase())
  return (
    <div>
      <h1>{category?.name} Detail Page</h1>
      <ul>
        { filteredProducts.map(item => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>Price: Rs. {item.price}</p>
            <p>Quantity: {item.count}</p>
            <img src={item.image} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryDetailPage
