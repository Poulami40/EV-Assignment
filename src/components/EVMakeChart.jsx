import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  // defs,
} from "recharts";

export default function EVMakeChart({ data }) {
  const makeCounts = [...data.reduce((map, ev) => {
    const make = ev.Make;
    map.set(make, (map.get(make) || 0) + 1);
    return map;
  }, new Map())]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([make, count]) => ({ make, count }));

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Top 10 EV Makes</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={makeCounts} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor=" #03DAC6" stopOpacity={0.9} />
              <stop offset="100%" stopColor=" #03DAC6" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis
  dataKey="make"
  stroke="#ccc"
  interval={0}
  angle={-40}
  textAnchor="end"
  height={60}
  tick={{ fill: "#ccc", fontSize: 12 }}
  label={{
    value: "Make",
    position: "bottom",
    offset: 30,
    fill: "#ccc",
    fontSize: 14,
  }}
/>

<YAxis
  stroke="#ccc"
  tick={{ fill: "#ccc", fontSize: 12 }}
  label={{
    value: "Count",
    angle: -90,
    position: "insideLeft",
    offset: -4,
    fill: "#ccc",
    fontSize: 14,
    dy: 40,
  }}
/>


          <Tooltip
            contentStyle={styles.tooltip}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />

          <Bar
            dataKey="count"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
            style={{ filter: "drop-shadow(0px 0px 5pxrgb(2, 88, 79))" }}
          />
        </BarChart>
      </ResponsiveContainer>
      {/* 📝 Summary Line */}
    <p style={styles.summary}>
      Tesla leads the market significantly, followed by Nissan and Chevrolet — highlighting their dominance in EV manufacturing.
    </p>
    </div>
  );
}

// 💅 Dark Theme Styling
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
    color: "#e5e5e5",
    textAlign: "center",
  },
  tooltip: {
    backgroundColor: "#333",
    border: "1px solid #444",
    color: "#fff",
  },
  summary: {
    marginTop: "12px",
    fontSize: "18px",
    color: "#cccccc",
    textAlign: "center",
    lineHeight: "1.4",
  },
  
};
