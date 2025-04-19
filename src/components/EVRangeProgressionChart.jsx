import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from "recharts";

export default function EVRangeProgressionChart({ data }) {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filterData = () => {
    let filteredData = [...data];
    if (selectedMake) filteredData = filteredData.filter((ev) => ev.Make === selectedMake);
    if (selectedType) filteredData = filteredData.filter((ev) => ev["Electric Vehicle Type"] === selectedType);
    return filteredData;
  };

  const calculateAverageRange = () => {
    const filteredData = filterData();
    const rangeByYear = {};
  
    filteredData.forEach((ev) => {
      const year = parseInt(ev["Model Year"], 10);  // Ensure it's an integer
      const range = parseFloat(ev["Electric Range"]);  // Ensure it's a float
  
      // Only process valid data
      if (!isNaN(year) && !isNaN(range)) {
        if (!rangeByYear[year]) {
          rangeByYear[year] = { totalRange: 0, count: 0 };
        }
        rangeByYear[year].totalRange += range;
        rangeByYear[year].count += 1;
      }
    });
  
    // Return the average range by year
    return Object.keys(rangeByYear).map((year) => ({
      year,
      averageRange: rangeByYear[year].totalRange / rangeByYear[year].count,
    }));
  };
  
  const averageRangeData = calculateAverageRange();

  // If there's no data, show a message
  if (averageRangeData.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>EV Model-Year vs. Electric Range Progression</h2>

        <div style={styles.filters}>
          <select
            onChange={(e) => setSelectedMake(e.target.value)}
            value={selectedMake}
            style={styles.select}
          >
            <option value="">Select Make</option>
            {[...new Set(data.map((ev) => ev.Make))].map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            style={styles.select}
          >
            <option value="">Select EV Type</option>
            {[...new Set(data.map((ev) => ev["Electric Vehicle Type"]))].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Display message when no data is found */}
        <p style={styles.noDataMessage}>No data found for the selected filters.</p>
      </div>
    );
  }


  // Find the year with the highest and lowest average range
  const highestYear = averageRangeData.reduce((prev, current) => (prev.averageRange > current.averageRange ? prev : current));
  const lowestYear = averageRangeData.reduce((prev, current) => (prev.averageRange < current.averageRange ? prev : current));

  // Determine the trend based on the first and last years
  const trend = averageRangeData[averageRangeData.length - 1].averageRange > averageRangeData[0].averageRange
    ? "increasing"
    : "decreasing";

  // Dynamic message based on selected make/type
  const message = selectedMake || selectedType
    ? `The chart displays the electric range progression for ${selectedMake ? selectedMake : selectedType} EVs. The highest average range was in ${highestYear.year} with ${highestYear.averageRange.toFixed(2)} miles, and the lowest average range was in ${lowestYear.year} with ${lowestYear.averageRange.toFixed(2)} miles. The overall trend appears to be ${trend}.`
    : `The chart shows the overall electric range progression across all makes and types of EVs. The highest average range was in ${highestYear.year} with ${highestYear.averageRange.toFixed(2)} miles, and the lowest average range was in ${lowestYear.year} with ${lowestYear.averageRange.toFixed(2)} miles. The overall trend appears to be ${trend}.`;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Year vs. Electric Range Progression</h2>

      <div style={styles.filters}>
        <select
          onChange={(e) => setSelectedMake(e.target.value)}
          value={selectedMake}
          style={styles.select}
        >
          <option value="">Select Make</option>
          {[...new Set(data.map((ev) => ev.Make))].map((make) => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
          style={styles.select}
        >
          <option value="">Select EV Type</option>
          {[...new Set(data.map((ev) => ev["Electric Vehicle Type"]))].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={averageRangeData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
          <defs>
            <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="year"
            stroke="#ccc"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis stroke="#ccc" />
          <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const { year, averageRange } = payload[0].payload; // Assuming payload contains year and averageRange
                const formattedAverageRange = parseFloat(averageRange).toFixed(3); // Format to 3 decimals
                return (
                  <div style={styles.tooltip}>
                    <p>{`Year: ${year}`}</p>
                    <p>{`Average Range: ${formattedAverageRange} miles`}</p>
                  </div>
                );
              }}
              contentStyle={styles.tooltip}
            />


          {/* Gradient Area under the line */}
          <Area
            type="monotone"
            dataKey="averageRange"
            fill="url(#rangeGradient)"
            stroke="none"
          />

          {/* Glowing Line */}
          <Line
            type="monotone"
            dataKey="averageRange"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ stroke: "#6366f1", strokeWidth: 2, r: 3 }}
            activeDot={{
              r: 6,
              fill: "#6366f1",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
            style={{
              filter: "drop-shadow(0px 0px 6px #6366f1)",
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

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
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
    textAlign:"center"
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    width: "80%",  // Increase this value to make the filter container wider
    margin: "0 auto", // Center the filter container
  },
  select: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "5px",
    fontSize: "16px",
    width: "200px",
    outline: "none",
  },
  tooltip: {
    backgroundColor: "#333",
    border: "1px solid #444",
    color: "#fff",
    padding: "15px 20px", // Increased padding for larger box
    borderRadius: "8px", // Slightly larger border radius
    fontSize: "16px", // Larger font size
    maxWidth: "250px", // Optional: Control the max width of the tooltip
    lineHeight: "1.4", // Improve text spacing
  },
};
