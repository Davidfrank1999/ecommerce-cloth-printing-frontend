import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

    const handleChange = ({ currentTarget: input }) => {
      setData({...data, [input.name]:input.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        try {
          const url = "http://localhost:5000/api/users";
          const {data: res} = await axios.post(url,data);
          navigate("/");
          console.log(res.message);
        } catch (error) {
          if( error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ){
		console.log(error.response.data.message);
            setError(error.response.data.message)
          }
        }     
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create New Account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" action="" onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <div>
                    <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">First Name</label>
                    <div className="mt-2">
                        <input type="text" name="firstName" id="firstName" value={data.firstName || ''}  onChange={handleChange} required className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Last Name</label>
                    <div className="mt-2">
                        <input type="text" name="lastName" id="lastName" value={data.lastName || ''}  onChange={handleChange} required className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
              <div className="mt-2">
                <input type="email" name="email" id="email" value={data.email || ''}  onChange={handleChange} required className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              <div className="mt-2">
                <input type={isPasswordVisible ? "text" : "password"} name="password" id="password" value={data.password || ''}  onChange={handleChange} required className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
              <div className="mt-2 relative">
               <input type={isPasswordVisible ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={data.confirmPassword || ''}  onChange={handleChange} required className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <button type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={togglePasswordVisibility}
            >
                {isPasswordVisible ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                )}
            </button>
              </div>
            </div>

            {error && <div className="block text-sm/6 font-medium text-gray-900">{error}</div>}

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
      
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?
            <a href={'/'} className="font-semibold text-indigo-600 hover:text-indigo-500"> Login to the account</a>
          </p>
        </div>
      </div>
    )
}

export default Signup;
