function LandingPage() {
    return(
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
                <h1 className="text-2xl font-bold text-purple-500">DevCollab</h1>
            <div className="flex gap-4">
                <button className="px-4 py-2 text-gray-300 hover:text-white">Login</button>
                <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">Sign Up</button>
            </div>
            </nav>
        </div>
    )
}

export default LandingPage