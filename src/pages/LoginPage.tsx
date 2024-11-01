import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://103.67.197.66:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Kiểm tra token để điều hướng
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        if (decodedToken.sub === "35") { // Kiểm tra ID admin
          navigate("/dashboard"); // Điều hướng đến dashboard
        } else if (decodedToken.sub === "36") { // Kiểm tra ID staff
          navigate("/browser-track"); // Điều hướng đến BrowserTrack
        } else if (decodedToken.sub === "38") { // Kiểm tra ID delivery
          navigate("/delivery-track"); // Điều hướng đến Delivery
        } else {
          navigate("/"); // Điều hướng đến trang chính
        }
      } else {
        setErrors({
          email: data.message || "Login failed",
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
         <div className="flex-shrink-0">
        <img src="/koilogo.png" alt="Icon Background" width="100" height="29" />
      </div>

          <div className="w-full">
            <div className="space-y-2">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Login
              </h2>
              <p>Welcome to Byke login to continue</p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        autoComplete="email"
                        required
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
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
                        autoComplete="current-password"
                        required
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.password ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FaEye className="h-5 w-5 text-gray-400" />
                        ) : (
                          <FaEyeSlash className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      {errors.password && (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="password-error"
                        >
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <CgSpinner className="animate-spin h-5 w-5 mr-3" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      aria-label="Sign in with Google"
                    >
                      <FaGoogle className="w-5 h-5 mr-2" />
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
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

export default LoginPage;
