import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function EVRangeHistogram({ data }) {
  // Prepare data
  const rangeData = data.map((ev) => ({
    electricRange: parseInt(ev["Electric Range"], 10) || 0,
  }));

  // Group data by range intervals
  const groupedData = rangeData.reduce((acc, curr) => {
    const range = Math.floor(curr.electricRange / 50) * 50;
    if (!acc[range]) acc[range] = { range: `${range}-${range + 49}`, count: 0 };
    acc[range].count += 1;
    return acc;
  }, {});

  const histogramData = Object.values(groupedData);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Electric Range Distribution</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor=" #82ca9d" stopOpacity={0.9} />
              <stop offset="100%" stopColor=" #82ca9d" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis
  dataKey="range"
  stroke="#ccc"
  tick={{ fill: "#ccc", fontSize: 12 }}
  angle={-30}
  textAnchor="end"
  height={50}
  label={{
    value: "Range (miles)",
    position: "bottom",
    offset: 35,
    fill: "#ccc",
    fontSize: 14,
  }}
/>

<YAxis
  stroke="#ccc"
  tick={{ fill: "#ccc", fontSize: 12 }}
  label={{
    value: "Number of Vehicles",
    angle: -90,
    position: "insideLeft",
    offset: -4,
    fill: "#ccc",
    fontSize: 14,
    dy: 50,
  }}
/>


          <Tooltip
            contentStyle={styles.tooltip}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />

          {/* <Legend wrapperStyle={{ color: "#ccc" }} /> */}

          <Bar
            dataKey="count"
            fill="url(#rangeGradient)"
            radius={[6, 6, 0, 0]}
            activeBar={{  stroke: "rgb(93, 93, 93)", strokeWidth: 2 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Dark mode styles
const styles = {
  container: {
    backgroundColor: " #1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
    marginBottom: "20px",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "600",
    color: " #e5e5e5",
    textAlign: "center",
  },
  tooltip: {
    backgroundColor: "#333",
    border: "1px solid #444",
    color: "#fff",
  },
};
