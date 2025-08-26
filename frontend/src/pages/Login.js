import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password)
      return handleError("Email and password are required");

    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000);
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
        <h2 className="text-xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
