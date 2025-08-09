import { useEffect, useState } from 'react'
import type { ProfileProps } from '../../../constants/types'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const [data, setData] = useState<ProfileProps | null>()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      setData(parsedData)
      console.log(parsedData)
    } else {
      setData(null)
      alert('user not found please login')
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <Link to='/' className='ml-5'>Go back Home<i className='fa fa-home ml-4 hover:text-blue-400' style={{ fontSize: 40 }}></i></Link>
      <h1 className='text-center text-4xl mt-20'>{data?.name}'s Profile</h1>

      {/* User details */}
      <div className="flex flex-col items-center mt-20">
        <i className='fa fa-user p-2 rounded-full border-1 w-50 h-50 text-center bg-gray-300' style={{ fontSize: 170}}></i>
        <div className="mt-5">
          <p><span className='font-semibold text-lg'>Username: </span>{data?.name}</p>
          <p><span className='font-semibold text-lg'>Email: </span>{data?.email}</p>
          <p><span className='font-semibold text-lg'>Mobile: </span>{data?.phoneNo}</p>
        </div>
      </div>
      
    </div>
  )
}

export default Profile
