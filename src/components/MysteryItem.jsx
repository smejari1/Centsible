import { useState } from "react";

export default function MysteryItem() {
  const items = [
    { name: "Flowers", emoji: "🌸" },
    { name: "Hat", emoji: "🎩" },
    { name: "Book", emoji: "📚" },
    { name: "Watch", emoji: "⌚" },
    { name: "Sunglasses", emoji: "🕶️" },
    { name: "Perfume", emoji: "💐" },
    { name: "Sneakers", emoji: "👟" },
    { name: "Necklace", emoji: "💎" },
    { name: "Chocolate", emoji: "🍫" },
    { name: "Coffee", emoji: "☕" },
    { name: "Bag", emoji: "👜" },
    { name: "Candle", emoji: "🕯️" },
    { name: "Scarf", emoji: "🧣" },
    { name: "Headphones", emoji: "🎧" },
  ];

  const [item, setItem] = useState(null);

  const getRandomItem = () => {
    const random = items[Math.floor(Math.random() * items.length)];
    setItem(random);
  };

  return (
    <div className="card">
      <h2 className="card-title">Mystery Item</h2>
      <p className="mystery-text">Wondering what to buy?</p>

      {!item ? (
        <button className="btn add" onClick={getRandomItem}>
          Find Out
        </button>
      ) : (
        <div className="mystery-result">
          <p className="mystery-item">
            {item.emoji} {item.name}
          </p>
          <button className="btn clear" onClick={getRandomItem}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
