import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  const navigate = useNavigate()

  const savedUserText = localStorage.getItem('user')
  
  const user = savedUserText ? JSON.parse(savedUserText) : null

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
        
        <div className="p-10 border-2 border-dashed border-gray-800 rounded-xl text-center text-gray-500">
          Task Board and Real-Time Chat coming soon...
        </div>
      </div>
    </div>
  )
}

export default DashboardPage