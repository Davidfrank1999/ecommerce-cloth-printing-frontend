import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserImg from '../assets/images/UserAvatar.jpg'

export default function UserLayout() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className=" max-w-6xl mx-auto relative bg-gradient-to-r from-indigo-500 to-blue-500 h-48 rounded-2xl shadow-lg">
        {/* Avatar */}
        <div className="absolute -bottom-16 left-6">
          <img
            src= {UserImg} //change into dynamic db img
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-500">johndoe@example.com</p>
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              Option 1
            </span>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Option 2
            </span>
          </div>
        </div>
      

        {/* Nested Routes */}
        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
