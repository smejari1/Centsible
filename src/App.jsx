import { useState } from "react";
import "./App.css";
import StreakBadge from "./components/streakbadge";
import FunFacts from "./components/FunFacts";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [splitTransactions, setSplitTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [people, setPeople] = useState(1);
  const [transactionType, setTransactionType] = useState("Save"); // Save/Spend dropdown
  const [streak, setStreak] = useState(0);
  const [showBonus, setShowBonus] = useState(false); // Visual streak bonus

  // Add transaction
  const handleAddTransaction = () => {
    if (!amount || !description) return;

    const newTransaction = {
      amount: parseFloat(amount),
      description,
      type: transactionType,
    };

    setTransactions([...transactions, newTransaction]);

    // Only update streak for saves
    if (transactionType === "Save") {
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Show streak bonus visually every 3 saves
      if (newStreak % 3 === 0) {
        setShowBonus(true);
        setTimeout(() => setShowBonus(false), 2000); // hide after 2 seconds
      }
    }

    // Reset inputs
    setAmount("");
    setDescription("");
    setPeople(1);
    setTransactionType("Save");
  };

  // Clear transaction history
  const handleClearTransactions = () => {
    setTransactions([]);
    setStreak(0);
  };

  // Split money
  const handleSplit = () => {
    if (!amount || people < 1) return;
    const splitAmount = parseFloat(amount) / people;
    const newSplit = { total: parseFloat(amount), perPerson: splitAmount, people };
    setSplitTransactions([...splitTransactions, newSplit]);
    setAmount("");
    setPeople(1);
  };

  const handleClearSplit = () => setSplitTransactions([]);

  return (
    <div className="app-container">
      <h1 className="app-title">Centsible</h1>

      <StreakBadge streak={streak} />

      {/* Streak bonus message */}
      {showBonus && (
        <div className="streak-bonus">
          🎉 Streak Bonus! Keep Saving! 🎉
        </div>
      )}

      {/* Transaction input */}
      <div className="card">
        <h2 className="card-title">Add Transaction</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="input-field"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Save">Save</option>
          <option value="Spend">Spend</option>
        </select>

        <div className="button-row">
          <button className="btn add" onClick={handleAddTransaction}>
            Add
          </button>
          <button className="btn clear" onClick={handleClearTransactions}>
            Clear History
          </button>
        </div>

        <div className="history">
          {transactions.map((t, i) => (
            <div className="history-item" key={i}>
              <span>{t.description}</span>
              <span>{t.type === "Save" ? "💰" : "💸"} ${t.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <p className="streak-text">Save 3 times in a row to get a streak bonus!</p>
      </div>

      {/* Split money section */}
      <div className="card">
        <h2 className="card-title">Split Money</h2>
        <input
          className="input-field"
          type="number"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Number of People"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        />
        <div className="button-row">
          <button className="btn add" onClick={handleSplit}>
            Split
          </button>
          <button className="btn clear" onClick={handleClearSplit}>
            Clear Split
          </button>
        </div>
        <div className="history">
          {splitTransactions.map((s, i) => (
            <div className="history-item" key={i}>
              <span>Total: ${s.total.toFixed(2)}</span>
              <span>{s.people} people × ${s.perPerson.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <FunFacts />
    </div>
  );
}

export default App;
