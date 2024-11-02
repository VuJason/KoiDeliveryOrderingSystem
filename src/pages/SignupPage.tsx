import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://103.67.197.66:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: "customer",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErrors({
          email: data.message || "Signup failed",
        });
      }
    } catch (error) {
      setErrors({
        email: "Network error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full lg:w-[65%] flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="flex justify-evenly flex-col flex-1">
          <div className="w-full">
            <svg
              width="86"
              height="24"
              viewBox="0 0 86 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4"
            >
              <path
                d="M13.5942 11.3448C16.3844 12.1883 19.4666 13.2914 19.4666 16.6656C19.4666 22.1163 16.2222 23.0572 10.512 23.0572C9.60352 23.0572 7.29997 23.0247 5.25598 23.0247V22.9923H0V0.28125H9.83063C14.6648 0.28125 18.2662 0.865248 18.2662 5.7319C18.2662 8.10033 16.5466 9.30077 13.5617 10.339C12.5884 10.6634 11.1933 10.4363 10.1551 10.4363V11.3123C10.804 11.3123 11.6151 11.215 12.3937 11.215C12.8155 11.215 13.2373 11.2474 13.5942 11.3448ZM5.25598 8.16522H8.07864C10.9337 8.16522 12.7831 7.90566 12.7831 6.08878C12.7831 4.2719 11.1284 4.23946 8.07864 4.23946H5.25598V8.16522ZM5.25598 19.1314H7.91641C12.1991 19.1314 13.9835 19.2936 13.9835 16.5359C13.9835 13.9079 11.5826 13.7132 7.00797 13.7132C6.65109 13.7132 6.26175 13.7132 5.48309 13.6808H5.25598V19.1314Z"
                fill="#020066"
              />
              <path
                d="M26.7354 0.28125L30.3691 6.21856C31.1154 7.38656 31.1803 9.1061 31.1803 10.5012H32.0563C32.0563 9.1061 32.1211 7.38656 32.8674 6.21856L36.6309 0.28125H42.4709L34.3922 12.2532V22.7652H28.9416V12.2532L20.863 0.28125H26.7354Z"
                fill="#020066"
              />
              <path
                d="M51.7018 6.93233L59.6831 0.28125H66.6911L57.5093 9.00877L67.5995 22.9923H60.8186L53.324 12.091L50.4689 14.4594V22.9923H45.2129V0.28125H50.4689V6.34834C50.4689 7.32167 49.7876 8.32744 49.3982 9.20344L50.2094 9.56032C50.5987 8.71677 50.9556 7.54878 51.7018 6.93233Z"
                fill="#020066"
              />
              <path
                d="M69.3561 22.9923V0.28125H85.8378V5.40745H74.612V8.94388H85.0267V14.0701H74.612V17.8661H86V22.9923H69.3561Z"
                fill="#020066"
              />
            </svg>
          </div>

          <div className="w-full">
            <div className="space-y-2">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign Up
              </h2>
              <p>Create your account to continue</p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <CgSpinner className="animate-spin h-5 w-5 mr-3" />
                        Creating account...
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-8 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-[45%]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./login-bg.png')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default SignupPage;