// src/components/EVSummary.jsx
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
  
  return (
    <div className="card-grid">
      <div className="card">
        <h2>Total EVs</h2>
        <p>{totalEVs}</p>
      </div>
      <div className="card">
        <h2>Most Common Make</h2>
        <p>{mostCommonMake}</p>
      </div>
      <div className="card">
        <h2>Average Range</h2>
        <p>{avgRange} mi</p>
      </div>
    </div>
  );
}
