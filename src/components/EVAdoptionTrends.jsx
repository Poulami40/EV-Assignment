import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

export default function EVAdoptionTrends({ data }) {
  const [selectedCounty, setSelectedCounty] = useState("All");

  const years = [...new Set(data.map(d => d["Model Year"]))].sort();
  const counties = ["All", ...new Set(data.map(d => d.County).filter(Boolean))];

  const chartData = years.map(year => {
    const filtered = data.filter(d => d["Model Year"] === year && (selectedCounty === "All" || d.County === selectedCounty));
    return {
      year: year.toString(),
      count: filtered.length,
    };
  });

  // Find the year with the highest and lowest adoption
  const highestYear = chartData.reduce((prev, current) => (prev.count > current.count ? prev : current));
  const lowestYear = chartData.reduce((prev, current) => (prev.count < current.count ? prev : current));

  // Determine the trend based on the first and last years
  const trend = chartData[chartData.length - 1].count > chartData[0].count
    ? "increasing"
    : "decreasing";

  // Dynamic message based on selected county
  const message = selectedCounty === "All"
    ? `The chart displays EV adoption trends for all counties. You can select a specific county to view adoption trends in that region. 
       The highest adoption was in ${highestYear.year} with ${highestYear.count} vehicles, and the lowest adoption was in ${lowestYear.year} with ${lowestYear.count} vehicles. The overall trend appears to be ${trend}.`
    : `EV adoption trends for ${selectedCounty} county. The data represents the number of EVs registered in each year for this county. 
       The highest adoption was in ${highestYear.year} with ${highestYear.count} vehicles, and the lowest adoption was in ${lowestYear.year} with ${lowestYear.count} vehicles. The trend in ${selectedCounty} county appears to be ${trend}.`;

  return (
    <div style={{ background: "#1a1a1a", padding: "2rem", borderRadius: "1rem", color: "white", marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "1rem", color: "#ffffff", textAlign: "center", }}>EV Adoption Trends by Year</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Select County:</label>
        <select
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "#2a2a2a",
            color: "white",
            border: "1px solid #444"
          }}
        >
          {counties.map((county, index) => (
            <option key={index} value={county}>{county}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="year" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#222", borderColor: "#555", color: "#fff" }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#ffffff" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />

          {/* Gradient Area Fill */}
          <Area
            type="monotone"
            dataKey="count"
            stroke="none"
            fill="url(#colorCount)"
          />

          {/* Glowing Line */}
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 3 }}
            activeDot={{
              r: 6,
              fill: "#82ca9d",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
            style={{
              filter: "drop-shadow(0px 0px 6px #82ca9d)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 📝 Dynamic Message */}
      <p style={{ marginTop: "12px", fontSize: "18px", color: "#cccccc", textAlign: "center", lineHeight: "1.4" }}>
        {message}
      </p>
    </div>
  );
}
