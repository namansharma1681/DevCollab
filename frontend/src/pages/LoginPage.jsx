function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-xl border border-gray-800 w-full max-w-md">
        
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8">Login to your account</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button className="w-full bg-purple-600 py-3 rounded-lg font-bold hover:bg-purple-700 cursor-pointer mt-2">
            Login
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <span className="text-purple-500 cursor-pointer hover:underline">Sign Up</span>
        </p>

      </div>
    </div>
  )
}

export default LoginPage