"use client";
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PersonalInfo() {
  const [user, setUser] = useState({ name: '', email: '' });

  const getUserInfo = async () => {
    try {
      const response = await axios.post("/api/userDetail/getUserDetail");
      const data = response.data;
      console.log('User Data:', data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const infoFields = [
    { label: "Full name", value: user.name },
    { label: "Email address", value: user.email },
    { label: "Phone number", value: "123456789" },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg m-10 w-screen max-w-2xl">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <p className="mt-1 text-sm text-gray-500">Personal details and application.</p>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {infoFields.map(({ label, value }) => (
            <div key={label} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">{label}</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
