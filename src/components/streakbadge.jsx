import { useEffect } from "react";
import confetti from "canvas-confetti";

function StreakBadge({ streak }) {
  useEffect(() => {
    // Trigger confetti only when streak is multiple of 3
    if (streak > 0 && streak % 3 === 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [streak]);

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      {streak > 0 && (
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#7c3aed" }}>
          🎉 Current Streak: {streak} save{streak > 1 ? "s" : ""} in a row!
        </p>
      )}
    </div>
  );
}

export default StreakBadge;
