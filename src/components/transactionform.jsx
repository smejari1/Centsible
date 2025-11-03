import React, { useState } from 'react';

function TransactionForm({ addTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('spend');
  const [emoji, setEmoji] = useState('💵');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    addTransaction({ title, amount: parseFloat(amount), type, emoji });
    setTitle('');
    setAmount('');
    setEmoji('💵');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
      <input
        type="text"
        placeholder="Transaction title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:outline-none"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:outline-none"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:outline-none"
      >
        <option value="spend">Spend</option>
        <option value="save">Save</option>
      </select>
      <input
        type="text"
        placeholder="Emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:outline-none"
      />
      <button className="px-10 py-4 bg-green-400 text-white text-xl font-bold rounded-2xl hover:bg-green-500 transition">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
