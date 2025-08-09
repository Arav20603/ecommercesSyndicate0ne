import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchCategories } from '../app/features/category/categoriesSlice'
import { logOut } from '../app/features/user/userSlice'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const {items: categoryItems, loading, error} = useAppSelector(state => state.categories)
  const navigate = useNavigate()

  const dropdownRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCategoryClick = () => {
    setShowDropdown(prev => !prev)
  }

  const handleLogout = () => {
    try {
      dispatch(logOut())
      alert('Successfully logged out')
      navigate('/login')
    } catch (error) {
      alert(`Error in logging out: ${error}`)
      console.log(error)
    }
  }

  return (
    <div className='flex justify-around items-center mt-4'>
      {/* title */}
      <div className="">
        <h1 className='text-3xl font-mono'>SyndiCommerce</h1>
      </div>

      {/* nav-links */}
      <nav className='bg-blue-400/50 px-5 py-2 rounded-3xl'>
        <ul className='flex gap-8 items-center'>
          <li><Link to='' className='hover:bg-white px-3 py-1 rounded-3xl'>Home</Link></li>
          <li className='' ref={dropdownRef}>
            <button className='cursor-pointer hover:bg-white px-3 py-1 rounded-3xl' onClick={ handleCategoryClick }>Category</button>
            { showDropdown && (
              <div className="flex flex-col absolute mt-2 bg-gray-100" onMouseLeave={handleCategoryClick}>
                { categoryItems.map(item => (
                  <Link to={`/category-detail/${item._id}`} className='hover:bg-gray-300/40 w-full p-3'>{item.name}</Link>
                )) }
              </div>
            )}
          </li>
          <li><Link to='product-page' className='hover:bg-white px-3 py-1 rounded-3xl'>Products</Link></li>
          <li><Link to='' className='hover:bg-white px-3 py-1 rounded-3xl'>Buy</Link></li>
          <li><Link to='' className='hover:bg-white px-3 py-1 rounded-3xl'>About us</Link></li>
        </ul>
      </nav>

      {/* Search bar */}
      <div className="">
        <input type="text" placeholder='search' className='bg-gray-100 px-4 py-2 rounded-3xl'
          value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button className='fa fa-search relative -left-7'></button>
      </div>

      {/* right side buttons */}
      <div className="flex gap-5 items-center">
        <Link to='/profile'><i className='fa fa-user hover:scale-103 text-blue-700' style={{ fontSize: 25 }}></i></Link>
        <Link to='/'><i className='fa fa-shopping-cart text-yellow-900' style={{ fontSize: 25 }}>
          <p className='absolute top-3 right-22 text-lg text-gray-800'></p></i></Link>
        <Link to='/'><i className='fa fa-heart hover:scale-103 text-red-500' style={{ fontSize: 20 }}></i></Link>
        <button onClick={handleLogout} className='bg-red-500 p-2 text-white cursor-pointer rounded-2xl'>logout</button>
      </div>
    </div>
  )
}

export default Navbar
