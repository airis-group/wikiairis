import {useEffect, useState} from 'react'
import { api } from '../../libs/connection'

const Login = () => {
    const [input, setInput] = useState('')
    const [err, setErr] = useState('')
    const [animate, setAnimate] = useState(false)
    const handleChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr('')
        setAnimate(false)
        await api.post(`/api/v1/auth/login`, input)
        .then((response) => {
  
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("data", JSON.stringify(response.data.data));
          window.location.href = "/u/dashboard";
          setTimeout(() => setAnimate(false), 700);
          setErr("");
        })
        .catch((error) => {
          setAnimate(false);
          setInput("");
          setErr(error.response.data.detail);
        });
    }
  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in To AIRIS</h1>
                        <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                    </div>
                    <div className="m-7">
                        {err ? 
                    <div className='bg-red-500 text-sm text-white mb-3 p-6 rounded-md text-center'>
                        {err}
                    </div>
                        : null}
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                                <input 
                                onChange={(e)=>handleChange(e)}
                                required
                                type="email" name="email" id="email" placeholder="you@email.com" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    {/* <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a> */}
                                </div>
                                <input 
                                onChange={(e)=>handleChange(e)}

                                type="password" required name="password" id="password" placeholder="Your Password" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            </div>
                            <div className="mb-6">
                                <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login