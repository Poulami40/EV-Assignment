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
    paddingTop: "80px"
  },
};

export default CAFVBarByMake;
