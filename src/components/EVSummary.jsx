import React from "react";

export default function EVSummary({ data }) {
  const totalEVs = data.length;
  const mostCommonMake = [...data.reduce((map, ev) => {
    const make = ev.Make;
    map.set(make, (map.get(make) || 0) + 1);
    return map;
  }, new Map())]
    .sort((a, b) => b[1] - a[1])[0][0];

  const avgRange = Math.round(
    data.reduce((sum, ev) => sum + (parseInt(ev["Electric Range"]) || 0), 0) / totalEVs
  );

  // Inline styles for glowing effect
  const glowingCardStyle = (delay) => ({
    backgroundColor: "#2c2c2c",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: `0 0 15px #ff4c5b, 0 0 30px #ff4c5b`,
    textAlign: "center",
    position: "relative",
    fontSize: "18px",
    animation: `glow 3s ${delay}s infinite alternate`,
  });

  const glowingKeyframes = `
    @keyframes glow {
      0% {
        box-shadow: 0 0 15px #ff4c5b, 0 0 30px #ff4c5b;
      }
      25% {
        box-shadow: 0 0 15px #00c49f, 0 0 30px #00c49f;
      }
      50% {
        box-shadow: 0 0 15px #4F46E5, 0 0 30px #4F46E5;
      }
      75% {
        box-shadow: 0 0 15px #fbbc04, 0 0 30px #fbbc04;
      }
      100% {
        box-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000;
      }
    }
  `;

  return (
    <div>
      {/* Inject keyframes directly into the style */}
      <style>{glowingKeyframes}</style>
      
      <div className="card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div className="card" style={glowingCardStyle(0)}>
          <h2>Total EVs</h2>
          <p>{totalEVs}</p>
        </div>
        <div className="card" style={glowingCardStyle(0.5)}>
          <h2>Most Common Make</h2>
          <p>{mostCommonMake}</p>
        </div>
        <div className="card" style={glowingCardStyle(1)}>
          <h2>Average Range</h2>
          <p>{avgRange} mi</p>
        </div>
      </div>
    </div>
  );
}
