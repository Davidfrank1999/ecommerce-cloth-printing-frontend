import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url = "http://localhost:5000/api/auth/signup";
      const { data: res } = await axios.post(url, data);

      setSuccess(res.message);
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

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
          Create New Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              required
              className="w-1/2 border border-accent/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
              required
              className="w-1/2 border border-accent/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full border border-accent/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            className="w-full border border-accent/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Error / Success */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-text/70">
          Already have an account?{" "}
          <a
            href="/"
            className="text-primary hover:text-secondary font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
