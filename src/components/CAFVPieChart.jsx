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

  const COLORS = ["#00C49F", "#FF4C5B"];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>CAFV Eligibility Distribution</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={aggregated}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
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
};

export default CAFVPieChart;
