import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    
    const navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)

        try{
        const response = await fetch('http://127.0.0.1:8000/api/login/',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        )
        const data = await response.json()
        if(!response.ok){
        console.log(data);
        return;
        }
        localStorage.setItem('access_token',data.access)
        localStorage.setItem('refresh_token',data.refresh)

        navigate('/')
    }
     catch (error){
        console.log(error.message);
    }
    finally{
        setLoading(false)
    }
}

  return (
    <>
       <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome Back
                </h1>

                <p className="text-gray-500 mt-2">
                    Login to continue to your Todo app
                </p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Username */}
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                   outline-none transition
                                   focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                    />
                </div>


                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                   outline-none transition
                                   focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                    />
                </div>


                {/* Login Button */}
                <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 text-white py-3 rounded-lg
               font-semibold
               hover:bg-blue-700
               disabled:bg-blue-400
               disabled:cursor-not-allowed
               active:scale-[0.98]
               transition duration-200"
>
    {loading ? "Logging in..." : "Login"}
</button>

            </form>


            {/* Register */}
            <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <a
                    href="/register"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Create one
                </a>
            </p>

        </div>

    </div>
    </>
  )
}
