function LandingPage() {
    return(
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-purple-500">DevCollab</h1>
            <div className="flex gap-4">
                <button className="px-4 py-2 text-gray-300 hover:text-white cursor-pointer">Login</button>
                <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 cursor-pointer">Sign Up</button>
            </div>
            </nav>

            {/* Hero Section */}

            <div className="flex flex-col items-center justify-center text-center mt-32 px-4">
            <h1 className="text-6xl font-bold mb-6">
                Build Together.{' '}
                <span className="text-purple-500">Ship Faster.</span>
            </h1>
            <p className="text-gray-400 text-xl mb-10 max-w-2xl">
                The platform where dev teams manage tasks, 
                chat in real time and review code — all in one place.
            </p>
            <div className="flex gap-4">
                <button className="px-8 py-3 bg-purple-600 rounded-lg text-lg hover:bg-purple-700 cursor-pointer">
                Get Started
                </button>
                <button className="px-8 py-3 border border-gray-600 rounded-lg text-lg hover:border-purple-500 cursor-pointer">
                Watch Demo
                </button>
            </div>
            </div>

            {/* features of this site */}
            
                <div className="flex justify-center gap-8 mt-24 px-10">
                
                <div className="bg-gray-900 p-8 rounded-xl w-72 border border-gray-800">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="text-xl font-bold mb-2">Task Board</h3>
                    <p className="text-gray-400">Manage your team's work with a beautiful kanban board.</p>
                </div>

                <div className="bg-gray-900 p-8 rounded-xl w-72 border border-gray-800">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-xl font-bold mb-2">Real Time Chat</h3>
                    <p className="text-gray-400">Instant messaging for your team — no refreshing needed.</p>
                </div>

                <div className="bg-gray-900 p-8 rounded-xl w-72 border border-gray-800">
                    <div className="text-4xl mb-4">👨‍💻</div>
                    <h3 className="text-xl font-bold mb-2">Code Review</h3>
                    <p className="text-gray-400">Review and comment on your teammate's code in one place.</p>
                </div>

                </div>
        </div>
    )
}

export default LandingPage