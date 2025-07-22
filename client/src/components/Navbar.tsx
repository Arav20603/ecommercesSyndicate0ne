import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-around'>
      {/* title */}
      <div className="">
        <h1>SyndiCommerce</h1>
      </div>

      {/* nav-links */}
      <nav>
        <ul className='flex gap-10'>
          <li><Link to=''>Home</Link></li>
          <li>
            <button className='drop'>Category</button>
            <div className="drop-down" style={{display: 'none'}}>
              <Link to=''>Furniture</Link>
              <Link to=''>Fashion and apparel</Link>
              <Link to=''>Toys and hobbies</Link>
            </div>
          </li>
          <li><Link to=''>Products</Link></li>
          <li><Link to=''>Buy</Link></li>
          <li><Link to=''>About us</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
