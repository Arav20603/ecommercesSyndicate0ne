import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchUser } from '../../../app/features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const {items: userData, error} = useAppSelector(state => state.user)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
      console.log(userData)
      alert(`Successfully logged in.\nWelcome, ${userData.name}!`)
      navigate('/home')
    }
  }, [userData, navigate])
  
  useEffect(() => {
    if (error) {
      alert(`Invalid Credentials`)
      setForm({...form, password: ''})
    }
  }, [error])

  const handleSubmit = (e: any) => {``
    e.preventDefault()
    dispatch(fetchUser(form))
  }


  return (
    <div className='m-20'>
      <h1 className='ml-10 underline text-4xl'>Login</h1>
     <form onSubmit={handleSubmit}
      className='p-5 bg-gray-100 w-100 flex flex-col gap-5'
     >

      {/* email input */}
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input type="email" name="email" value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value.toString()})} placeholder='Enter your email'
          className='p-2 bg-white rounded-2xl' required
          />
        </div>

        {/* password input */}
        <div className="flex flex-col gap-2">
          <label>Password:</label>
          <input type="password" name="password" value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value.toString()})} placeholder='Enter your password' 
          className='p-2 bg-white rounded-2xl' required
          />
        </div>

        {/* btn */}
        <button type='submit' className='bg-blue-500 p-2 w-30 ml-20 rounded-2xl'>Submit</button>
     </form>
    </div>
  )
}

export default Login
