"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState('');
  const getUserInfo =async () => {
    
    
   try {
    const response=await axios.post("/api/userDetail/getUserDetail")
    const name=response.data.name
    setUsername(name)  
   } catch (error) {
    console.error('Error fetching user info:', error);
   }
    
  };
  useEffect(() => {
    // Your code to fetch user information
    getUserInfo();
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-[#fbfaf6]">
      <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex md:order-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          {/* Profile Icon on the Right (Always Visible, Not Inside Sidebar) */}
          {
            username ? (<Link href={"/profile/personalinfo"} className="flex items-center md:order-3 md:ml-auto">
              profile
              <img src="/pngegg.png" alt="Profile" className="w-8 h-8" />
            </Link>) : (
              
              <Link href={"/login"} className="flex items-center md:order-3 md:ml-auto">
                login
                <img src="/pngegg.png" alt="Profile" className="w-8 h-8" />
              </Link>
            )
          }

        </div>

        {/* Navigation Links Positioned at the Bottom of Icons */}
        <div className={`items-center justify-center w-full md:flex md:w-auto md:order-2 ${isOpen ? 'block' : 'hidden'}`} id="navbar-cta">
          <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-2 md:mt-0 border md:space-x-8 rtl:space-x-reverse md:border-0 dark:border-gray-700 text-center w-full justify-center items-center">
            <li className="border-b md:border-none md:py-2">
              <Link href="/" className="font-serif block py-2 px-3 md:p-0 text-gray-700 rounded-sm md:bg-transparent md:dark:hover:text-gray-400">
                Home
              </Link>
            </li>
            <li className="border-b md:border-none md:py-2">
              <Link href="/allcollection" className="font-serif block py-2 px-3 md:p-0 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                All collection
              </Link>
            </li>
            <li className="border-b md:border-none md:py-2">
              <Link href="/allproducts" className="font-serif block py-2 px-3 md:p-0 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                All products
              </Link>
            </li>
            <li className="border-b md:border-none md:py-2">
              <Link href="/patterns" className="font-serif block py-2 px-3 md:p-0 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Patterns
              </Link>
            </li>
            <li className="border-b md:border-none md:py-2">
              <Link href="/contactus" className="font-serif block py-2 px-3 md:p-0 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
