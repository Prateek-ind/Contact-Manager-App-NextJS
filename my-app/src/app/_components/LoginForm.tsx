
import { LoginAction } from "../actions/auth"

const LoginForm = () => {

  return (
    <form action={LoginAction} className="space-x-4">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input type="email" name="email"
            placeholder="Enter your email"
            required
            className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="password" className=" mt-1 block text-sm font-medium text-gray-700">
                Password
            </label>
            <input type="password" name="password"
            placeholder="Enter your password"
            required
            className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Login
        </button>
    </form>
  )
}

export default LoginForm