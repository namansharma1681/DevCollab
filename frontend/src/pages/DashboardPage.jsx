import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'

function DashboardPage() {
  const navigate = useNavigate()
  const savedUserText = localStorage.getItem('user')
  const user = savedUserText ? JSON.parse(savedUserText) : null

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/get/${user.id}`)
      const data = await response.json()
      setTasks(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  fetchTasks()
}, [])

  // 3. Create a Logout function
  const handleLogout = () => {
    localStorage.removeItem('token') // Throw away the ID badge
    localStorage.removeItem('user')  // Throw away the user data
    navigate('/login')               // Kick them back to the login page
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Dashboard Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800 bg-gray-900">
        <h1 className="text-2xl font-bold text-purple-500">DevCollab</h1>
        <div className="flex items-center gap-6">
          {/*  dynamically insert the user's name  */}
          <span className="text-gray-300">
            Welcome, <span className="font-bold text-white">{user?.name || 'Developer'}</span>!
          </span>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600/20 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-6">Your Workspace</h2>
        
        {loading ? (
  <div className="text-center text-gray-400 mt-20">Loading tasks...</div>
) : (
  <div className="flex gap-6">
    
    {/* To Do Column */}
    <div className="flex-1 bg-gray-900 rounded-xl p-4 border border-gray-800">
      <h3 className="text-lg font-bold mb-4 text-red-400">📋 To Do</h3>
      <div className="flex flex-col gap-3">
        {tasks.filter(task => task.status === 'To Do').map(task => (
          <div key={task._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold">{task.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* In Progress Column */}
    <div className="flex-1 bg-gray-900 rounded-xl p-4 border border-gray-800">
      <h3 className="text-lg font-bold mb-4 text-yellow-400">⚡ In Progress</h3>
      <div className="flex flex-col gap-3">
        {tasks.filter(task => task.status === 'In Progress').map(task => (
          <div key={task._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold">{task.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Done Column */}
    <div className="flex-1 bg-gray-900 rounded-xl p-4 border border-gray-800">
      <h3 className="text-lg font-bold mb-4 text-green-400">✅ Done</h3>
      <div className="flex flex-col gap-3">
        {tasks.filter(task => task.status === 'Done').map(task => (
          <div key={task._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold">{task.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
          </div>
        ))}
      </div>
    </div>

  </div>
)}
      </div>
    </div>
  )
}

export default DashboardPage