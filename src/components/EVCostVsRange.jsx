// src/components/EVCostVsRange.jsx
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EVCostVsRange({ data }) {
  // Process data and clean it
  const chartData = data.reduce((acc, ev) => {
    const msrp = parseFloat(ev["Base MSRP"]);
    const range = parseFloat(ev["Electric Range"]);
    const model = ev.Model;

    // Skip if MSRP or Range is invalid
    if (!model || isNaN(msrp) || isNaN(range)) return acc;

    const existingModel = acc.find((item) => item.model === model);
    if (existingModel) {
      existingModel.popularity += 1;
    } else {
      acc.push({
        model,
        msrp,
        range,
        popularity: 1,
      });
    }

    return acc;
  }, []);

  // Calculate insights only from valid data
  const averageMSRP = (
    chartData.reduce((sum, d) => sum + d.msrp, 0) / chartData.length
  ).toFixed(2);
  const averageRange = (
    chartData.reduce((sum, d) => sum + d.range, 0) / chartData.length
  ).toFixed(2);
  const mostPopularModel = chartData.reduce((prev, curr) =>
    prev.popularity > curr.popularity ? prev : curr
  );

  return (
    <div className="chart-container" style={{marginBottom:"40px"}}>
      <h2 style={{ textAlign: "center" }}>
        Cost vs. Range (Size Represents Model Popularity)
      </h2>
      <ResponsiveContainer width="100%" height={450}>
        <ScatterChart>
          <YAxis type="number" dataKey="msrp" name="Base MSRP" unit="$" />
          <XAxis type="number" dataKey="range" name="Electric Range" unit="miles" />
          <ZAxis type="number" dataKey="popularity" range={[30, 400]} name="Model Popularity" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="EV Models" data={chartData} fill="#4F46E5" />
        </ScatterChart>
      </ResponsiveContainer>

    {/* Insights */}
<div
  style={{
    marginTop: "2rem",
    backgroundColor: " #1e1e1e",
    padding: "1.5rem",
    borderRadius: "12px",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom:"40px"
  }}
>
  <h3
    style={{
      textAlign: "center",
      marginBottom: "1rem",
      fontSize: "1.5rem",
      color: "#e5e5e5",
      borderBottom: "1px solid #333",
      paddingBottom: "0.5rem",
    }}
  >
    Insights
  </h3>
  <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
    <strong style={{ color: " #00C49F" }}>Average MSRP:</strong> ${averageMSRP}
  </p>
  <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
    <strong style={{ color: "rgb(99, 91, 238)" }}>Average Electric Range:</strong> {averageRange} miles
  </p>
  <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
    <strong style={{ color: "rgb(252, 121, 131)" }}>Most Popular Model:</strong> {mostPopularModel.model}{" "}
    <span style={{ color: "#999" }}>(Seen {mostPopularModel.popularity} times)</span>
  </p>
</div>

    </div>
  );
}
