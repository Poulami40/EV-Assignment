import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CAFVPieChart = ({ data }) => {
  const aggregated = [
    {
      name: "Eligible",
      value: data.filter(
        (d) =>
          d["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] ===
          "Clean Alternative Fuel Vehicle Eligible"
      ).length,
    },
    {
      name: "Not Eligible",
      value: data.filter(
        (d) =>
          d["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] !==
          "Clean Alternative Fuel Vehicle Eligible"
      ).length,
    },
  ];

  // Calculate the total value to get percentages
  const total = aggregated.reduce((sum, item) => sum + item.value, 0);
  const eligiblePercentage = ((aggregated[0].value / total) * 100).toFixed(2);
  const notEligiblePercentage = ((aggregated[1].value / total) * 100).toFixed(2);

  const COLORS = ["#00C49F", "#FF4C5B"];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>CAFV Eligibility Distribution</h2>
      <div style={styles.chartContainer}>
  <PieChart width={600} height={500}> {/* Increased width and height */}
    <Pie
      data={aggregated}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={150} 
      label
      stroke=" #1a1a1a"
    >
      {aggregated.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]}
          style={{ filter: `drop-shadow(0 0 6px ${COLORS[index % COLORS.length]})` }}
        />
      ))}
    </Pie>
    <Tooltip
      contentStyle={styles.tooltip}
      labelStyle={{ color: "#fff" }}
      itemStyle={{ color: "#fff" }}
    />
    <Legend
      wrapperStyle={styles.legend}
      iconSize={12}
    />
  </PieChart>
</div>

      {/* Insights Section */}
      <div style={styles.insightContainer}>
        <h3 style={styles.insightHeader}>Insights</h3>
        <p style={styles.insightText}>
          <strong>Eligible:</strong> {aggregated[0].value} vehicles ({eligiblePercentage}%) are eligible for Clean Alternative Fuel Vehicle programs.
        </p>
        <p style={styles.insightText}>
          <strong>Not Eligible:</strong> {aggregated[1].value} vehicles ({notEligiblePercentage}%) are not eligible.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    marginBottom: "20px",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    flexDirection: "column", // Align content in a column if you have multiple elements (like header)
    textAlign: "center", // Center any text inside the container
  },
  header: {
    fontSize: "22px",
    marginBottom: "20px",
    fontWeight: "600",
    color: "#e5e5e5",
  },
  tooltip: {
    backgroundColor: "#333",
    border: "1px solid #444",
    color: "#fff",
  },
  legend: {
    color: "#ccc",
  },
  insightContainer: {
    marginTop: "60px",
    // backgroundColor: " #2a2a2a",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
  insightHeader: {
    fontSize: "18px",
    marginBottom: "12px",
    fontWeight: "600",
    color: "#fff",
  },
  insightText: {
    fontSize: "16px",
    color: "#ccc",
    lineHeight: "1.6",
  },
};

export default CAFVPieChart;
