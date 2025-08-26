import React from "react";

function ExpenseDetails({ transactions }) {
  // calculate income and expenses
  const incomeAmt = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const expenseAmt = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const balance = incomeAmt - expenseAmt;

  return (
    <div className="mb-6">
      {/* Balance */}
      <div className="bg-yellow-300 text-black font-semibold text-xl rounded-xl p-6 mb-6 shadow">
        <p>Your Balance</p>
        <p className="text-3xl font-bold">₹ {balance}</p>
      </div>

      {/* Income & Expense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-200 rounded-xl p-6 shadow">
          <p className="font-semibold text-green-800">Income</p>
          <p className="text-2xl font-bold text-green-900">₹ {incomeAmt}</p>
        </div>
        <div className="bg-red-200 rounded-xl p-6 shadow">
          <p className="font-semibold text-red-800">Expense</p>
          <p className="text-2xl font-bold text-red-900">₹ {expenseAmt}</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
