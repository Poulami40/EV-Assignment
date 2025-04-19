// src/components/EVCostVsRange.jsx
import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EVCostVsRange({ data }) {
  // Process data to get Base MSRP, Electric Range, and popularity (vehicle count per model)
  const chartData = data.reduce((acc, ev) => {
    const existingModel = acc.find(item => item.model === ev.Model);
    if (existingModel) {
      existingModel.popularity += 1; // Increment count for the model
    } else {
      acc.push({
        model: ev.Model,
        msrp: ev["Base MSRP"],
        range: ev["Electric Range"],
        popularity: 1, // Initialize with 1 as it's the first occurrence of this model
      });
    }
    return acc;
  }, []);

  return (
    <div className="chart-container">
      <h2 style={{textAlign: "center",}}>Cost vs. Range (Size Represents Model Popularity)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <YAxis type="number" dataKey="msrp" name="Base MSRP" unit="$" />
          <XAxis type="number" dataKey="range" name="Electric Range" unit="miles" />
          <ZAxis type="number" dataKey="popularity" range={[30, 400]} name="Model Popularity" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="EV Models" data={chartData} fill="#4F46E5" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
