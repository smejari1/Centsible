import React, { useState } from 'react';
import StreakBadge from './streakbadge';
import TransactionForm from './transactionform';
import SplitMoneyForm from './SplitMoneyForm';
import FunFacts from './FunFacts';

function Dashboard({ transactions, addTransaction, clearTransactions, streak }) {
  const [splitTransactions, setSplitTransactions] = useState([]);

  const addSplitTransaction = (split) => {
    setSplitTransactions([split, ...splitTransactions]);
  };

  const clearSplitTransactions = () => setSplitTransactions([]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-4 gap-6">
      <StreakBadge streak={streak} />
      <TransactionForm addTransaction={addTransaction} />
      <SplitMoneyForm
        addSplitTransaction={addSplitTransaction}
        clearSplitTransactions={clearSplitTransactions}
      />

      <button
        onClick={clearTransactions}
        className="px-10 py-4 bg-red-400 text-white text-xl font-bold rounded-2xl hover:bg-red-500 transition"
      >
        Clear Transaction History
      </button>

      <FunFacts />

      <div className="w-full flex flex-col gap-4 mt-4">
        {transactions.map((t, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl shadow-md bg-white flex justify-between items-center text-lg"
          >
            <span>{t.emoji} {t.title}</span>
            <span className={`font-bold ${t.type === 'spend' ? 'text-red-600' : 'text-green-600'}`}>
              ${t.amount}
            </span>
          </div>
        ))}
      </div>

      {splitTransactions.length > 0 && (
        <div className="w-full flex flex-col gap-4 mt-6">
          <h2 className="text-2xl font-bold text-center">💸 Split Transactions</h2>
          {splitTransactions.map((s, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl shadow-md bg-white flex justify-between items-center text-lg"
            >
              <span>👥 {s.people} pay ${s.amountPerPerson}</span>
            </div>
          ))}
          <button
            onClick={clearSplitTransactions}
            className="mt-2 px-6 py-3 bg-red-400 text-white rounded-2xl hover:bg-red-500 transition"
          >
            Clear Split History
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
