import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // ✅ import context

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ use login from context

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url = "http://localhost:5000/api/auth/login";
      const { data: res } = await axios.post(url, data);

      setSuccess(res.message);

      // ✅ Use context login instead of manually setting localStorage
      login(res.user, res.token);

      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-text mb-8">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full border border-accent/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full border border-accent/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Error / Success */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-text/70">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-primary hover:text-secondary font-semibold"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
