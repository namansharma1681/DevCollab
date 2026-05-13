import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-xl border border-gray-800 w-full max-w-md">

        <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">Join DevCollab today</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Naman Sharma"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

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
            Create Account
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-500 hover:underline">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default SignupPage