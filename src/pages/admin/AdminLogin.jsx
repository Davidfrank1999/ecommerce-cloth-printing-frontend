import { useState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ 
        email: "", 
        password: "" 
    }); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setFormData({...formData, [input.name]:input.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/admin/login";
      const res = await axios.post(url, formData);  // <-- corrected
  
      // Store token in localStorage
      localStorage.setItem("admin_token", res.data.token);
      console.log("Token saved:", localStorage.getItem("admin_token"));
      console.log(res.data.message); // or success message from server
      navigate("/admin"); // redirect after login
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-[#FAFAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-[36px] font-bold text-center mb-8 text-[#020817]">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#020817] mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D7074]" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-white text-[#020817] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] border-[#E0E0E0]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#020817] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D7074]" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-2 border rounded-md bg-white text-[#020817] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] border-[#E0E0E0]"
              />

                {error && <div className="block text-sm/6 font-medium text-gray-900">{error}</div>}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6D7074]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {error.password && (
              <p className="mt-1 text-sm text-[#FF4C4C] animate-fade-in">
                {error.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || Object.keys(error).length > 0}
            className="w-full bg-[#0D6EFD] text-white py-2 rounded-md transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
