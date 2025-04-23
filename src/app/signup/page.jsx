"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const router=useRouter();
  const [user,setUser]=useState({name:"",email:"",phone:"",password:""});

  const onSignup=async (e) => {
    e.preventDefault();
    try {
      const response =await axios.post("/api/Auth/signup", user);
      console.log("Sign up Success");
      router.push(`/login`); 
    } catch (error) {
      console.log("Error",error);
    }
  }




  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 ml-1"
          >
            login to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form method="POST" action="#">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Please enter your name"
                type="text"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                placeholder="user@example.com"
                type="email"
                value={user.email}
                onChange={(e)=>{setUser({...user,email: e.target.value})}}
                required
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={user.phone}
                onChange={
                  (e) => setUser({ ...user, phone: e.target.value })
                }
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
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
                onChange={
                  (e) => setUser({ ...user, password: e.target.value })
                }
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 sm:text-sm"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={onSignup}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Create account
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 ml-1"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
