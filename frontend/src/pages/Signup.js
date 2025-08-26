import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password)
      return handleError("Name, email and password are required");

    try {
      const url = `${APIUrl}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else if (error) {
        handleError(error?.details[0]?.message || "Error occurred");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="mb-8 text-2xl font-bold text-gray-800">
        MoneyMate – Expense Tracker
      </h1>

      {/* Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">Signup</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
