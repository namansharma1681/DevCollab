import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'


function DashboardPage() {
  const navigate = useNavigate()
  const savedUserText = localStorage.getItem('user')
  const user = savedUserText ? JSON.parse(savedUserText) : null

  //for adding the tasks form which we can fill and add tasks
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

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

  // Create a Logout function
  const handleLogout = () => {
    localStorage.removeItem('token') // Throw away the ID badge
    localStorage.removeItem('user')  // Throw away the user data
    navigate('/login')               // Kick them back to the login page
  }

  // creating function which will handle the created tasks
  const handleCreateTask = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        status: 'To Do',
        userId: user.id
      })
    })
    const data = await response.json()
    setTasks([...tasks, data])
    setShowForm(false)
    setNewTitle('')
    setNewDescription('')
  } catch (error) {
    console.log(error)
  }
}

//for moving tasks from one status to another
  const handleUpdateStatus = async (taskId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    const updatedTask = await response.json()
    setTasks(tasks.map(task => 
      task._id === taskId ? updatedTask : task
    ))
  } catch (error) {
    console.log(error)
  }
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

    {/*Added task button and make it function*/} 
    <button
      onClick={() => setShowForm(true)}
      className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-purple-500 hover:text-purple-500 cursor-pointer mb-3"
    >
      + Add Task
    </button>

    {showForm && (
      <div className="bg-gray-800 p-4 rounded-lg mb-3 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="bg-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 border border-gray-600"
        />
        <input
          type="text"
          placeholder="Description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="bg-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 border border-gray-600"
        />
        <div className="flex gap-2">
          <button
            onClick={handleCreateTask}
            className="flex-1 bg-purple-600 py-2 rounded-lg text-sm hover:bg-purple-700 cursor-pointer"
          >
            Create
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="flex-1 bg-gray-700 py-2 rounded-lg text-sm hover:bg-gray-600 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
      
      <div className="flex flex-col gap-3">
        {tasks.filter(task => task.status === 'To Do').map(task => (
          <div key={task._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold">{task.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
            <div className="flex gap-2 mt-3">
              {task.status !== 'In Progress' && task.status !== 'Done' && (
                <button
                  onClick={() => handleUpdateStatus(task._id, 'In Progress')}
                  className="text-xs px-2 py-1 bg-yellow-600 rounded cursor-pointer hover:bg-yellow-700"
                >
                  → In Progress
                </button>
              )}
              {task.status !== 'Done' && (
                <button
                  onClick={() => handleUpdateStatus(task._id, 'Done')}
                  className="text-xs px-2 py-1 bg-green-600 rounded cursor-pointer hover:bg-green-700"
                >
                  → Done
                </button>
              )}
            </div>
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
            <div className="flex gap-2 mt-3">
              {task.status !== 'In Progress' && task.status !== 'Done' && (
                <button
                  onClick={() => handleUpdateStatus(task._id, 'In Progress')}
                  className="text-xs px-2 py-1 bg-yellow-600 rounded cursor-pointer hover:bg-yellow-700"
                >
                  → In Progress
                </button>
              )}
              {task.status !== 'Done' && (
                <button
                  onClick={() => handleUpdateStatus(task._id, 'Done')}
                  className="text-xs px-2 py-1 bg-green-600 rounded cursor-pointer hover:bg-green-700"
                >
                  → Done
                </button>
              )}
            </div>
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
            <div className="flex gap-2 mt-3">
              {task.status !== 'In Progress' && task.status !== 'Done' && (
                <button
                  onClick={() => handleUpdateStatus(task._id, 'In Progress')}
                  className="text-xs px-2 py-1 bg-yellow-600 rounded cursor-pointer hover:bg-yellow-700"
                >
                  → In Progress
                </button>
              )}
              {task.status !== 'Done' && (
                <button
                  onClick={() => handleUpdateStatus(task._id, 'Done')}
                  className="text-xs px-2 py-1 bg-green-600 rounded cursor-pointer hover:bg-green-700"
                >
                  → Done
                </button>
              )}
            </div>
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