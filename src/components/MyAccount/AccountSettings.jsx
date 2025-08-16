import { useState } from 'react';
import { Lock, Trash2, Pencil } from 'lucide-react';

const AccountSettings = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-50 border-r">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Account Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="cursor-pointer text-primary font-medium">Profile Information</div>
            <div className="cursor-pointer text-gray-700 hover:text-primary">Security</div>
            <div className="cursor-pointer text-gray-700 hover:text-primary">Saved Addresses</div>
            <div className="cursor-pointer text-gray-700 hover:text-primary">Payment Options</div>
            <div className="cursor-pointer text-gray-700 hover:text-primary">Logout</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent text-gray-800"
              />
              <Pencil className="w-4 h-4 text-gray-500 ml-2" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent text-gray-800"
              />
              <Pencil className="w-4 h-4 text-gray-500 ml-2" />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent text-gray-800"
              />
              <Pencil className="w-4 h-4 text-gray-500 ml-2" />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-700 transition cursor-pointer">
              <Lock className="w-4 h-4 mr-2" /> Change Password
            </button>
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer">
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;