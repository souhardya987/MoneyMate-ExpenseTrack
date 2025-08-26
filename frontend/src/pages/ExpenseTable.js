import React from "react";

const ExpenseTable = ({ expenses, deleteExpens }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet.</p>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <div className="flex-1">{expense.text}</div>
              <div
                className={`font-bold ${
                  expense.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{expense.amount}
              </div>
              <button
                onClick={() => deleteExpens(expense._id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
