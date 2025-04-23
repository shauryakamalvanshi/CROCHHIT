"use client";
import { useState } from "react";
import PersonalInfo from "@/app/components/personalinfo";
import Order from "@/app/components/Order";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/navigation";

const Sidebar = ({ params }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const profile = params.profile;

  const renderPage = () => {
    if (profile === "personalinfo") {
      return <PersonalInfo />;
    } else if (profile === "order") {
      return <Order />;
    } else {
      return <div className="p-4 text-red-500">404 - Page Not Found</div>;
    }
  };
  const logout=async(e)=>{
    e.preventDefault()
    try {
      const response=await axios.post('/api/Auth/logout');
      router.push('/')
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <div className="relative flex w-full" onClick={() => setIsOpen(false)}>
      {/* Hamburger Menu */}
      <button
        className="p-2 m-4 bg-gray-200 rounded-md md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`absolute md:relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-64 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-transform duration-300 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            My Account
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          
        <Link href="/profile/personalinfo" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
            
            Personal Information
          </Link>
         < Link href="/profile/order" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
            Order
          </Link>
          <br />
          <div
          onClick={logout}
            role="button"
            tabIndex="0"
            className="cursor-pointer flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      {renderPage()}
    </div>
  );
};

export default Sidebar;
