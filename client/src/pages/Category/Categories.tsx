import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteCategories, fetchCategories } from "../../app/features/category/categoriesSlice"
import { Link, useNavigate } from "react-router-dom"

const Categories: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((state) => state.categories)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
    console.log("Items", items)
  }, [dispatch])

  const handleDelete = (_id: string) => {
    if (window.confirm("Do u want to delete?") === true) {
      dispatch(deleteCategories(_id))
      alert('Category deleted successfully')
    }
  }

  if (loading) return <p>Loading.....</p>
  if (error) return <p>Error..... {error}</p>

  return (
    <div>
      <div className="flex justify-between mx-20 my-5">
        <h1 className="text-4xl">Categories</h1>
        <Link to='/add-category'> <h1 className="bg-blue-700 p-3 w-40 text-white rounded-2xl text-center">Add Category</h1></Link>
        <Link to='/'> <h1 className="bg-red-500 p-3 w-40 text-white rounded-2xl text-center">Home Page</h1></Link>
      </div>

      { items.length === 0 ? <p>No categories found</p> : (
      <ul className="grid grid-cols-3">
        {items.map((item: any) => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <img src={item.image} alt={item.name} className="w-70 h-50" />

            {/* btn */}
            <div className="flex gap-4 mt-5 ml-5">
              <button onClick={() => navigate(`/category-edit/${item._id}`)} className="p-2 bg-blue-600 text-white rounded-xl w-1/5">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-600 text-white rounded-xl w-1/5">Delete</button>
            </div>
          </li>
        ))}
      </ul> )}
    </div>
  )
}

export default Categories
