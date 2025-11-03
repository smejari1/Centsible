import React, { useState } from 'react';

function SplitMoneyForm({ addSplitTransaction, clearSplitTransactions }) {
  const [amount, setAmount] = useState('');
  const [people, setPeople] = useState('');

  const handleSplit = (e) => {
    e.preventDefault();
    if (!amount || !people) return;
    const perPerson = (parseFloat(amount) / parseInt(people)).toFixed(2);
    addSplitTransaction({ amountPerPerson: perPerson, people });
    setAmount('');
    setPeople('');
  };

  return (
    <form onSubmit={handleSplit} className="flex flex-col items-center gap-4 w-full mt-6">
      <input
        type="number"
        placeholder="Total amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:outline-none"
      />
      <input
        type="number"
        placeholder="Number of people"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:outline-none"
      />
      <div className="flex gap-4">
        <button className="px-10 py-4 bg-blue-400 text-white text-xl font-bold rounded-2xl hover:bg-blue-500 transition">
          Split Money
        </button>
        <button
          type="button"
          onClick={clearSplitTransactions}
          className="px-6 py-4 bg-red-400 text-white text-xl font-bold rounded-2xl hover:bg-red-500 transition"
        >
          Clear Split
        </button>
      </div>
    </form>
  );
}

export default SplitMoneyForm;
