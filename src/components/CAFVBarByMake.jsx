import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CAFVBarByMake = ({ data }) => {
  // Aggregate by make
  const makeMap = {};

  data.forEach((ev) => {
    const make = ev.Make;
    const eligible = ev["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
    if (!makeMap[make]) makeMap[make] = { make, Eligible: 0, NotEligible: 0 };

    if (eligible === "Clean Alternative Fuel Vehicle Eligible") {
      makeMap[make].Eligible++;
    } else {
      makeMap[make].NotEligible++;
    }
  });

  const chartData = Object.values(makeMap)
    .sort((a, b) => b.Eligible + b.NotEligible - (a.Eligible + a.NotEligible))
    .slice(0, 10); // Top 10 makes

  // Calculate total for each make
  const totalByMake = chartData.map((make) => {
    const total = make.Eligible + make.NotEligible;
    const eligiblePercentage = ((make.Eligible / total) * 100).toFixed(2);
    const notEligiblePercentage = ((make.NotEligible / total) * 100).toFixed(2);
    return { make: make.make, eligiblePercentage, notEligiblePercentage };
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>CAFV Eligibility by Make</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            dataKey="make"
            stroke="#cccccc"
            tick={{
              fill: "#cccccc",
              fontSize: 11,
              angle: -45, // Rotate labels 45 degrees for visibility
              textAnchor: "end", // Align text properly when rotated
              dy: 10, // Adjust vertical position
            }}
            interval={0} // Ensure every label is shown
          />
          <YAxis stroke="#cccccc" tick={{ fill: "#cccccc", fontSize: 11 }} />
          <Tooltip
            contentStyle={styles.tooltip}
            labelStyle={{ color: "#ffffff" }}
            itemStyle={{ color: "#ffffff" }}
          />
          <Legend wrapperStyle={styles.legend} />
          <Bar
            dataKey="Eligible"
            stackId="a"
            fill="#00C49F"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="NotEligible"
            stackId="a"
            fill="#FF4C5B"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    
  {/* Insights Section */}
<div style={styles.insightContainer}>
  {/* <h3 style={styles.insightHeader}>Insights</h3> */}
  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.tableHeader}>Make</th>
        <th style={styles.tableHeader}>Eligible (%)</th>
        <th style={styles.tableHeader}>Not Eligible (%)</th>
      </tr>
    </thead>
    <tbody>
      {totalByMake.map((item, index) => (
        <tr key={index} style={styles.tableRow}>
          <td style={styles.tableCell}><strong>{item.make}</strong></td>
          <td style={styles.tableCell}><span style={styles.eligibleText}>{item.eligiblePercentage}%</span></td>
          <td style={styles.tableCell}><span style={styles.notEligibleText}>{item.notEligiblePercentage}%</span></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "2rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
  },
  header: {
    color: "#e5e5e5",
    marginBottom: "1rem",
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
  },
  tooltip: {
    backgroundColor: "#333",
    border: "1px solid #444",
  },
  legend: {
    color: "#cccccc",
    paddingTop: "80px",
  },
  insightContainer: {
    backgroundColor: "#1e1e1e",
    padding: "1rem",
    borderRadius: "10px",
    color: "#ffffff",
  },
  insightHeader: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#ffffff",
    padding: "10px",
    textAlign: "center",
  },
  tableRow: {
    borderBottom: "1px solid #444",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
  },
  eligibleText: {
    color: "#00C49F", // Green
  },
  notEligibleText: {
    color: "#FF4C5B", // Red
  },
};

export default CAFVBarByMake;
