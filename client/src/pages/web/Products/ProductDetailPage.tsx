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
    <div className='m-4'>
      <p className='underline text-2xl font-bold'>{product?.name.toUpperCase()}</p>
      <img src={product?.image} alt={product?.name} />
      <p>{product?.description}</p>
      <p>Price: Rs.{product?.price}</p>
      <p>Quantity: {product?.count}</p>

      {/* shop buttons */}
      <div className="flex gap-4">
        <button className='bg-yellow-500 p-2 rounded-2xl'>Add to cart</button>
        <button className='bg-red-300 p-2 rounded-2xl'>Buy now</button>
      </div>
    </div>
  )
}

export default ProductDetailPage