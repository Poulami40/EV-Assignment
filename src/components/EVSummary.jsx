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

  // Inline styles for static glowing effect
const glowingCardStyle = {
  backgroundColor: "#2c2c2c",
  color: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 0 15px rgb(138, 132, 255), 0 0 30px rgb(76, 255, 243)", // Static glow
  textAlign: "center",
  position: "relative",
  fontSize: "18px",
};


return (
  <div>
    <div
      className="card-grid"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
    >
      <div className="card" style={glowingCardStyle}>
        <h2>Total EVs</h2>
        <p>{totalEVs}</p>
      </div>
      <div className="card" style={glowingCardStyle}>
        <h2>Most Common Make</h2>
        <p>{mostCommonMake}</p>
      </div>
      <div className="card" style={glowingCardStyle}>
        <h2>Average Range</h2>
        <p>{avgRange} mi</p>
      </div>
    </div>
  </div>
);
}
