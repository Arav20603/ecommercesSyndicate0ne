import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className='text-center text-7xl mt-20 underline'>Welcome Mr. Syndicate</h1>
      <div className="flex gap-10 items-center justify-center mt-20">
        <Link to='/category'><p className='bg-blue-700 text-white p-5 text-4xl rounded-2xl w-70 text-center cursor-pointer hover:bg-blue-600'>Category</p></Link>
        <Link to='/product'><p className='bg-gray-600 text-white p-5 text-4xl rounded-2xl w-70 text-center cursor-pointer hover:bg-gray-500'>Product</p></Link>
      </div>
    </>
  )
}

export default Home
