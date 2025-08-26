import React from "react";

function ExpenseDetails({ incomeAmt, expenseAmt }) {
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
