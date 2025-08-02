import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

const ProductDetailPage = () => {
  const dispatch = useAppDispatch()
  const {items: productItems, loading, error} = useAppSelector(state => state.products)
  const { _id } = useParams<string>()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error....{error}</p>

  
  const product = productItems.find(item => item._id === _id)

  return (
    <div>
      <p>{product?.name.toUpperCase()}</p>
      <img src={product?.image} alt={product?.name} />
      <p>{product?.description}</p>
      <p>Price: Rs.{product?.price}</p>
      <p>Quantity: {product?.count}</p>
    </div>
  )
}

export default ProductDetailPage