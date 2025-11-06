import { useState } from "react";
import "./App.css";
import StreakBadge from "./components/streakbadge";
import FunFacts from "./components/FunFacts";
import MysteryItem from "./components/MysteryItem";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [splitTransactions, setSplitTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [people, setPeople] = useState(1);
  const [transactionType, setTransactionType] = useState("Save");
  const [streak, setStreak] = useState(0);
  const [showBonus, setShowBonus] = useState(false);

  // Currency converter states
  const [usdAmount, setUsdAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [currency, setCurrency] = useState("INR");

  const rates = {
    INR: 83.12,
    EUR: 0.93,
    JPY: 152.75,
    MXN: 19.05,
  };

  const easterEggs = {
    1: "🥳 Just 1! Every penny counts!",
    18: "🎓 UNC Status Achieved! Congrats!",
    42: "🌌 42 → The Answer to Life, the Universe, and Everything!",
    67: "😎 Lucky 67! Feeling silly today!",
    1000: "💰 Whoa! Big spender alert!",
  };

  // Convert Currency
  const convertCurrency = () => {
    if (!usdAmount || usdAmount <= 0) return;

    const message = easterEggs[parseInt(usdAmount)];
    if (message) setConverted(message);
    else setConverted((parseFloat(usdAmount) * rates[currency]).toFixed(2));
  };

  // Add transaction
  const handleAddTransaction = () => {
    if (!amount || !description) return;

    const transaction = {
      amount: parseFloat(amount),
      description,
      type: transactionType,
    };

    setTransactions([...transactions, transaction]);

    if (transactionType === "Save") {
      const newStreak = streak + 1;
      setStreak(newStreak);

      if (newStreak % 3 === 0) {
        setShowBonus(true);
        setTimeout(() => setShowBonus(false), 2000);
      }
    }

    setAmount("");
    setDescription("");
    setPeople(1);
    setTransactionType("Save");
  };

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
              <span>
                {t.type === "Save" ? "💰" : "💸"} ${t.amount.toFixed(2)}
              </span>
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

      {/* Fun Facts */}
      <FunFacts />

      {/* Mystery Item */}
      <MysteryItem />

      {/* Currency Converter with Easter Eggs */}
      <div className="card">
        <h2 className="card-title">Currency Converter</h2>
        <input
          className="input-field"
          type="number"
          placeholder="Amount in USD"
          value={usdAmount}
          onChange={(e) => setUsdAmount(e.target.value)}
        />

        <select
          className="input-field"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">Indian Rupees (₹)</option>
          <option value="EUR">Euros (€)</option>
          <option value="JPY">Japanese Yen (¥)</option>
          <option value="MXN">Mexican Pesos (₱)</option>
        </select>

        {!converted ? (
          <button className="btn add" onClick={convertCurrency}>
            Convert
          </button>
        ) : (
          <div className="mystery-result">
            <p className="mystery-item">
              {["67", "1", "1000", "42", "18"].includes(usdAmount)
                ? converted
                : `💱 ${usdAmount} USD = ${converted} ${currency}`}
            </p>
            <button className="btn clear" onClick={() => setConverted(null)}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
