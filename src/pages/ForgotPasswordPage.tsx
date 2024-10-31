import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newErrors = {};
      if (!email) newErrors.email = "Email is required";
      setErrors(newErrors);
      setIsLoading(false);
      navigate("/verify");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="flex justify-evenly flex-col flex-1">
          <div className="flex-shrink-0">
        <img src="/koilogo.png" alt="Icon Background" width="100" height="29" />
      </div>

          <div className="w-full">
            <div className="space-y-2">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Forgot Password?
              </h2>
              <p>Enter the email address you registered for this account</p>
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
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <CgSpinner className="animate-spin h-5 w-5 mr-3" />
                          Loading...
                        </>
                      ) : (
                        "Verify and Process"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-600 text-center">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-[45%]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./forgotpassword-bg.png')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
