import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => navigate('/login'), 1000);
  };

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: { 'Authorization': localStorage.getItem('token') },
        method: "DELETE"
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  // ✅ Moved fetchExpenses into useEffect
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `${APIUrl}/expenses`;
        const headers = {
          headers: { 'Authorization': localStorage.getItem('token') }
        };
        const response = await fetch(url, headers);
        if (response.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        const result = await response.json();
        setExpenses(result.data);
      } catch (err) {
        handleError(err);
      }
    };

    fetchExpenses();
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome {loggedInUser} !!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <p className="mb-6 text-gray-600">Manage your finances with ease</p>

      {/* Details */}
      <ExpenseDetails transactions={expenses} />

      {/* Form */}
      <ExpenseForm addTransaction={addTransaction} />

      {/* Table */}
      <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />

      <ToastContainer />
    </div>
  );
}

export default Home;
