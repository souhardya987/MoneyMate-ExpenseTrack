import React, { useState } from "react";
import { handleError } from "../utils";

function ExpenseForm({ addTransaction }) {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [expenseInfo, setExpenseInfo] = useState({ amount: "", text: "" });

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const submitIncome = (e) => {
    e.preventDefault();
    if (!incomeAmount) return handleError("Please enter income amount");
    const parsedAmount = parseFloat(incomeAmount);
    if (isNaN(parsedAmount)) return handleError("Amount must be a number");
    addTransaction({ text: "Income", amount: Math.abs(parsedAmount), month, year });
    setIncomeAmount("");
  };

  const submitExpense = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) return handleError("Please add expense details");
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return handleError("Amount must be a number");
    addTransaction({ text, amount: -Math.abs(parsedAmount), month, year });
    setExpenseInfo({ amount: "", text: "" });
  };

  return (
    <div className="w-full">
      {/* Month & Year aligned */}
      <div className="flex flex-wrap justify-center gap-6 bg-white p-4 rounded-xl shadow mb-6">
        <div>
          <label className="mr-2 font-semibold">Month:</label>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="bg-gray-100 border border-gray-300 p-2 rounded-lg"
          >
            {monthNames.map((m, index) => (
              <option key={index} value={index + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="bg-gray-100 border border-gray-300 p-2 rounded-lg"
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Forms side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Form */}
        <form onSubmit={submitIncome} className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-green-600 font-semibold mb-4">+ Add Income</h2>
          <input
            type="number"
            placeholder="Amount..."
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded-lg text-white hover:bg-green-600"
          >
            Add Income
          </button>
        </form>

        {/* Expense Form */}
        <form onSubmit={submitExpense} className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-red-600 font-semibold mb-4">+ Add Expense</h2>
          <input
            type="text"
            name="text"
            placeholder="Expense detail..."
            value={expenseInfo.text}
            onChange={(e) =>
              setExpenseInfo((prev) => ({ ...prev, text: e.target.value }))
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount..."
            value={expenseInfo.amount}
            onChange={(e) =>
              setExpenseInfo((prev) => ({ ...prev, amount: e.target.value }))
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-red-500 py-2 rounded-lg text-white hover:bg-red-600"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
