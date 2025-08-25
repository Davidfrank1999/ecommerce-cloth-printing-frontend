import { useState } from "react";


function UserDashboard() {

  const [editPassword, setEditPassword] = useState(false);

  return (
    <div>
      {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Account Created</p>
            <p className="font-semibold">Jan 10, 2024</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Purchases</p>
            <p className="font-semibold">12</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Designs</p>
            <p className="font-semibold">8</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* User Info */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-1">Name:</p>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-1">Email:</p>
            <input
              type="email"
              defaultValue="johndoe@example.com"
              disabled
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-1">Address:</p>
            <div className="space-y-2">
              <input
                type="text"
                defaultValue="123 Main Street"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <input
                type="text"
                defaultValue="Apartment 45"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <input
                type="text"
                defaultValue="New York, USA"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <input
                type="text"
                defaultValue="10001"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Section */}
          <div>
            <p className="text-gray-600 mb-2">Password:</p>
            {!editPassword ? (
              <button
                className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setEditPassword(true)}
              >
                Edit?
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Old password"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow">
            Save Changes
          </button>
        </div>
    </div>
  )
}

export default UserDashboard