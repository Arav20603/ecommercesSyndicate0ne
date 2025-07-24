import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchCategories } from '../app/features/category/categoriesSlice'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useAppDispatch()
  const {items: categoryItems, loading, error} = useAppSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = () => {
    setShowDropdown(prev => !prev)
  }
  return (
    <div className='flex justify-around items-center mt-4'>
      {/* title */}
      <div className="">
        <h1 className='text-3xl font-mono'>SyndiCommerce</h1>
      </div>

      {/* nav-links */}
      <nav>
        <ul className='flex gap-10'>
          <li><Link to=''>Home</Link></li>
          <li className='first:pt-0 last:pb-0'>
            <button className='cursor-pointer' onClick={ handleCategoryClick }>Category</button>
            { showDropdown && (
              <div className="flex flex-col absolute mt-2 bg-gray-100">
                { categoryItems.map(item => (
                  <Link to={`/category-detail/${item._id}`} className='hover:bg-gray-300/40 w-full p-3'>{item.name}</Link>
                )) }
              </div>
            )}
          </li>
          <li><Link to=''>Products</Link></li>
          <li><Link to=''>Buy</Link></li>
          <li><Link to=''>About us</Link></li>
        </ul>
      </nav>

      {/* Search bar */}
      <div className="">
        <input type="text" placeholder='search'  className='bg-gray-100 px-4 py-2 rounded-3xl'/>
        <button className='fa fa-search relative -left-7'></button>
      </div>

      {/* right side buttons */}
      <div className="flex gap-5">
        <button><i className='material-icons'>person</i></button>
        <button>Cart</button>
        <button>Wishlist</button>
      </div>
    </div>
  )
}

export default Navbar
