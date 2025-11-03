import { useEffect, useState } from "react";

const facts = [
  "💸 The average college student spends $1,200/month on snacks and coffee!",
  "🚶‍♂️ Walking instead of Ubering saves money and keeps you fit!",
  "🍕 Budget for fun treats! It’s okay to enjoy life while saving!",
  "📚 Use student discounts whenever possible! Every dollar counts!",
  "💰 Even saving $5/day adds up to $150/month!",
  "🎉 Celebrate small wins! Saving streaks deserve a reward!",
];

function FunFacts() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 5000); // Change fact every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow-md max-w-md text-center">
      <h2 className="text-xl font-bold mb-2">💡 Fun Fact</h2>
      <p className="text-lg">{facts[currentFactIndex]}</p>
    </div>
  );
}

export default FunFacts;
