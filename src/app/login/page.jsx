"use client"
import Link from "next/link";
import React from "react";
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const LoginForm = () => {

  const router=useRouter();
  const[user,setUser]=useState({email:"",password:""});

  const onLogin=async(e)=>{
    e.preventDefault();
    try {
      console.log("papa");
      
      console.log(user);
      const response=await axios.post("/api/Auth/login",user)
      console.log(response);
      
      if (response.status === 200) {
        router.push('/'); // Redirect only on success
      }
    } catch (error) {
      console.log("login error",+error);
    }
   

  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            create a new account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50  py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form method="POST" action="#">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={user.email}
                onChange={(e)=>{
                  setUser({...user,email:e.target.value})
                }}
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
                placeholder="user@example.com"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={user.password}
                onChange={(e)=>{
                  setUser({...user,password:e.target.value})
                }}
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4  text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onLogin}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              href={"/signup"}
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 ml-1"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
